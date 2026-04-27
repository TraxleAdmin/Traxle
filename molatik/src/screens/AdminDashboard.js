import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, Modal, Alert } from 'react-native';
import { auth, db } from '../config/firebase';
import { collection, onSnapshot, doc, setDoc, updateDoc, deleteDoc, query, orderBy, limit } from 'firebase/firestore';
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

export default function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const [activeBreaks, setActiveBreaks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newEmpName, setNewEmpName] = useState('');
  const [newEmpSicil, setNewEmpSicil] = useState('');
  const [newEmpShift, setNewEmpShift] = useState('morning_shift'); // 'morning_shift' or 'evening_shift'
  const [logsModalVisible, setLogsModalVisible] = useState(false);
  const [breakLogs, setBreakLogs] = useState([]);
  const [selectedUserLogs, setSelectedUserLogs] = useState([]);

  useEffect(() => {
    const setupAdminNotifications = async () => {
      if (!Device.isDevice) return;
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Uyarı", "Personel mola bildirimlerini almak için bildirim izni vermelisiniz.");
        return;
      }
      try {
          const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
          const pushTokenString = (await Notifications.getExpoPushTokenAsync({
              projectId: projectId || "dummy-project-id",
          })).data;
          if (auth.currentUser) {
              await updateDoc(doc(db, "users", auth.currentUser.uid), {
                  pushToken: pushTokenString
              });
          }
      } catch (e) {
          console.log("Failed to get push token:", e);
      }
    };
    setupAdminNotifications();

    // Listen to all users
    const usersUnsub = onSnapshot(collection(db, 'users'), (snapshot) => {
      const emps = [];
      snapshot.forEach(doc => {
        if (doc.data().role !== 'admin') {
          emps.push({ id: doc.id, ...doc.data() });
        }
      });
      setEmployees(emps);
    });

    // Listen to break logs (last 50 for performance)
    const logsQuery = query(collection(db, 'break_logs'), orderBy('timestamp', 'desc'), limit(50));
    const logsUnsub = onSnapshot(logsQuery, (snapshot) => {
      const logs = [];
      snapshot.forEach(doc => logs.push({ id: doc.id, ...doc.data() }));
      setBreakLogs(logs);
    });

    // Listen to active breaks
    const breaksUnsub = onSnapshot(collection(db, 'active_breaks'), (snapshot) => {
      const breaks = [];
      snapshot.docChanges().forEach(change => {
        const data = change.doc.data();

        // Trigger local notification for admins when an employee pauses or resumes
        // Note: For push notifications to work when the admin app is closed, this should be moved
        // to a Firebase Cloud Function using Expo Push API. The current local implementation is for MVP.
        if (change.type === 'modified') {
           if (data.state === 'paused') {
               Notifications.scheduleNotificationAsync({
                   content: { title: 'Mola Duraklatıldı', body: `${data.userName} molasını duraklattı (Ara).` },
                   trigger: null,
               });
           } else if (data.state === 'active') {
               Notifications.scheduleNotificationAsync({
                   content: { title: 'Molaya Devam Ediliyor', body: `${data.userName} molasına devam ediyor.` },
                   trigger: null,
               });
           } else if (data.state === 'finished') {
               Notifications.scheduleNotificationAsync({
                   content: { title: 'Mola Bitti', body: `${data.userName} molasını tamamladı.` },
                   trigger: null,
               });
           }
        }
      });

      snapshot.forEach(doc => {
        if (doc.data().state !== 'finished') {
          breaks.push({ id: doc.id, ...doc.data() });
        }
      });
      setActiveBreaks(breaks);
    });

    return () => {
      usersUnsub();
      breaksUnsub();
      logsUnsub();
    };
  }, []);

  const handleAddEmployee = async () => {
    if (!newEmpName || !newEmpSicil) {
      Alert.alert('Hata', 'Lütfen isim ve sicil numarası girin.');
      return;
    }

    try {
      // Create a document in Firestore.
      // The user will set their own password on first login via the LoginScreen logic
      const newUserId = `${newEmpSicil.trim().toLowerCase()}_${Date.now()}`;
      await setDoc(doc(db, 'users', newUserId), {
        name: newEmpName,
        sicilNo: newEmpSicil.trim(),
        role: 'employee',
        shiftType: newEmpShift,
        email: `${newEmpSicil.trim().toLowerCase()}@molatik.com`, // Dummy email for auth
        needsPasswordSetup: true,
        hwid: null,
        dailyBreaks: { timestamp: Date.now(), used: { morning: false, noon: false, evening: false } }
      });

      setModalVisible(false);
      setNewEmpName('');
      setNewEmpSicil('');
      Alert.alert('Başarılı', 'Personel başarıyla eklendi.');
    } catch (error) {
      Alert.alert('Hata', 'Personel eklenemedi: ' + error.message);
    }
  };

  const handleResetHWID = async (userId) => {
    Alert.alert(
      'Cihaz Sıfırlama',
      'Bu personelin cihaz kilidini sıfırlamak istediğinize emin misiniz? (Şifresi de sıfırlanacaktır)',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sıfırla',
          onPress: async () => {
            await updateDoc(doc(db, 'users', userId), {
                hwid: null,
                needsPasswordSetup: true
            });
            Alert.alert('Başarılı', 'Cihaz kilidi ve şifre sıfırlandı. Personel tekrar sicil no ile girip şifre belirleyebilir.');
          }
        }
      ]
    );
  };

  const handleDeleteEmployee = async (userId) => {
      Alert.alert(
          'Personel Sil',
          'Bu personeli sistemden kalıcı olarak silmek istediğinize emin misiniz?',
          [
              { text: 'İptal', style: 'cancel'},
              {
                  text: 'Sil',
                  style: 'destructive',
                  onPress: async () => {
                      await deleteDoc(doc(db, 'users', userId));
                  }
              }
          ]
      )
  };

  const openUserLogs = (sicilNo) => {
      const userLogs = breakLogs.filter(log => log.sicilNo === sicilNo);
      setSelectedUserLogs(userLogs);
      setLogsModalVisible(true);
  };

  const renderActiveBreak = ({ item }) => {
    return (
      <View style={styles.breakCard}>
        <Text style={styles.breakName}>{item.userName}</Text>
        <Text>Mola Tipi: {item.type === 'morning' ? 'Sabah' : item.type === 'noon' ? 'Öğlen' : 'Akşam'}</Text>
        <Text>Durum: <Text style={{fontWeight: 'bold', color: item.state === 'active' ? 'green' : 'orange'}}>{item.state === 'active' ? 'Aktif' : 'Duraklatıldı (Ara)'}</Text></Text>
        <Text style={styles.breakTime}>
            Başlangıç: {new Date(item.startedAt).toLocaleTimeString()}
        </Text>
      </View>
    );
  };

  const renderEmployee = ({ item }) => (
    <View style={styles.empCard}>
      <View style={{flex: 1}}>
        <Text style={styles.empName}>{item.name}</Text>
        <Text>Sicil: {item.sicilNo}</Text>
        <Text>Vardiya: {item.shiftType === 'morning_shift' ? 'Sabah' : 'Akşam'}</Text>
        <Text style={item.hwid ? {color: 'green'} : {color: 'red'}}>
            {item.hwid ? 'Cihaz Kayıtlı' : 'Cihaz Kayıtsız'}
        </Text>
      </View>
      <View style={styles.empActions}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => openUserLogs(item.sicilNo)}>
            <Text style={styles.actionText}>Geçmiş</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => handleResetHWID(item.id)}>
            <Text style={styles.actionText}>Sıfırla</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, {backgroundColor: 'red'}]} onPress={() => handleDeleteEmployee(item.id)}>
            <Text style={styles.actionText}>Sil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Yönetici Paneli</Text>

      <Text style={styles.subHeader}>Aktif Molalar ({activeBreaks.length})</Text>
      <View style={{maxHeight: 200}}>
          <FlatList
            data={activeBreaks}
            renderItem={renderActiveBreak}
            keyExtractor={item => item.id}
            ListEmptyComponent={<Text style={{textAlign: 'center', margin: 10}}>Şu an molada olan kimse yok.</Text>}
          />
      </View>

      <View style={styles.empHeaderRow}>
          <Text style={styles.subHeader}>Personeller</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
            <Text style={styles.addBtnText}>+ Ekle</Text>
          </TouchableOpacity>
      </View>

      <FlatList
        data={employees}
        renderItem={renderEmployee}
        keyExtractor={item => item.id}
      />

      <TouchableOpacity style={styles.logoutBtn} onPress={() => auth.signOut()}>
        <Text style={styles.logoutText}>Çıkış Yap</Text>
      </TouchableOpacity>

      {/* Add Employee Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Yeni Personel Ekle</Text>

            <TextInput
              style={styles.input}
              placeholder="İSİM SOYİSİM"
              value={newEmpName}
              onChangeText={setNewEmpName}
              autoCapitalize="characters"
            />

            <TextInput
              style={styles.input}
              placeholder="Personel Parmak Sicili"
              value={newEmpSicil}
              onChangeText={setNewEmpSicil}
            />

            <View style={styles.shiftSelector}>
                <TouchableOpacity
                    style={[styles.shiftBtn, newEmpShift === 'morning_shift' && styles.shiftBtnActive]}
                    onPress={() => setNewEmpShift('morning_shift')}
                >
                    <Text style={[styles.shiftText, newEmpShift === 'morning_shift' && styles.shiftTextActive]}>Sabah Vardiyası</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.shiftBtn, newEmpShift === 'evening_shift' && styles.shiftBtnActive]}
                    onPress={() => setNewEmpShift('evening_shift')}
                >
                    <Text style={[styles.shiftText, newEmpShift === 'evening_shift' && styles.shiftTextActive]}>Akşam Vardiyası</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={{color: '#333'}}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleAddEmployee}>
                <Text style={{color: '#fff'}}>Kaydet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Break Logs Modal */}
      <Modal visible={logsModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, {maxHeight: '80%'}]}>
            <Text style={styles.modalTitle}>Mola Geçmişi</Text>
            {selectedUserLogs.length === 0 ? (
                <Text style={{textAlign: 'center', marginTop: 20}}>Yakın zamanda mola kaydı bulunamadı.</Text>
            ) : (
                <FlatList
                    data={selectedUserLogs}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <View style={{borderBottomWidth: 1, borderColor: '#eee', paddingVertical: 10}}>
                            <Text style={{fontWeight: 'bold'}}>{item.action}</Text>
                            <Text style={{color: '#666', fontSize: 12}}>
                                {new Date(item.timestamp).toLocaleDateString()} {new Date(item.timestamp).toLocaleTimeString()}
                            </Text>
                        </View>
                    )}
                />
            )}
            <TouchableOpacity style={[styles.cancelBtn, {marginTop: 20}]} onPress={() => setLogsModalVisible(false)}>
                <Text style={{textAlign: 'center'}}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f5f5f5', paddingTop: 50 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  subHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#555' },
  empHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 10 },
  addBtn: { backgroundColor: '#4CAF50', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 5 },
  addBtnText: { color: '#fff', fontWeight: 'bold' },
  breakCard: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, borderLeftWidth: 5, borderLeftColor: '#2196F3', elevation: 2 },
  breakName: { fontSize: 16, fontWeight: 'bold' },
  breakTime: { fontSize: 12, color: '#666', marginTop: 5 },
  empCard: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, flexDirection: 'row', elevation: 1 },
  empName: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  empActions: { justifyContent: 'space-around' },
  actionBtn: { backgroundColor: '#FF9800', padding: 8, borderRadius: 5, marginBottom: 5 },
  actionText: { color: '#fff', fontSize: 12, textAlign: 'center' },
  logoutBtn: { marginTop: 20, padding: 15, alignItems: 'center' },
  logoutText: { color: '#d32f2f', fontSize: 16, fontWeight: 'bold' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 15 },
  shiftSelector: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  shiftBtn: { flex: 1, padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginHorizontal: 5, alignItems: 'center' },
  shiftBtnActive: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  shiftText: { color: '#333' },
  shiftTextActive: { color: '#fff', fontWeight: 'bold' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  cancelBtn: { flex: 1, padding: 15, backgroundColor: '#eee', borderRadius: 8, marginRight: 10, alignItems: 'center' },
  saveBtn: { flex: 1, padding: 15, backgroundColor: '#4CAF50', borderRadius: 8, marginLeft: 10, alignItems: 'center' }
});
