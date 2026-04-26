import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { auth, db } from '../config/firebase';
import { collection, onSnapshot, doc, setDoc, updateDoc, deleteField, query, where, orderBy, limit } from 'firebase/firestore';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function AdminDashboard() {
  const { user, userData } = useAuth();
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
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Uyarı', 'Personel mola bildirimlerini almak için bildirim izni vermelisiniz.');
      }
    };
    setupAdminNotifications();

    // Listen to all users
    const usersUnsub = onSnapshot(collection(db, 'users'), (snapshot) => {
      const emps = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.role !== 'admin') {
          emps.push({ id: doc.id, ...data });
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
        // In a real app with backend, we'd use Expo Push Notifications triggered by Cloud Functions.
        // Here, we simulate it by catching Firestore doc modifications.
        if (change.type === 'modified') {
           if (data.state === 'paused') {
               Notifications.scheduleNotificationAsync({
                   content: { title: 'Mola Duraklatıldı', body: `${data.userName} molasını duraklattı (Ara).` },
                   trigger: null, // Send immediately
               });
           } else if (data.state === 'active') {
               Notifications.scheduleNotificationAsync({
                   content: { title: 'Molaya Devam Ediyor', body: `${data.userName} molasına kaldığı yerden devam ediyor.` },
                   trigger: null,
               });
           }
        } else if (change.type === 'added' && data.state === 'active') {
             // Only notify if it's a recent break to avoid spam on initial load
             if (Date.now() - data.startedAt < 10000) {
                 Notifications.scheduleNotificationAsync({
                     content: { title: 'Mola Başladı', body: `${data.userName} molaya çıktı.` },
                     trigger: null,
                 });
             }
        }
      });

      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.state !== 'finished') {
            breaks.push({ id: doc.id, ...data });
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

  const openLogsForUser = (sicilNo) => {
      const logs = breakLogs.filter(log => log.sicilNo === sicilNo);
      setSelectedUserLogs(logs);
      setLogsModalVisible(true);
  };

  const handleAddEmployee = async () => {
    if (!newEmpName || !newEmpSicil) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }
    const upperName = newEmpName.toUpperCase();

    // We create a generic email for Firebase Auth based on sicil no
    const email = `${newEmpSicil.trim().toLowerCase()}@molatik.com`;

    try {
      // Create user document only. The user will register their Auth account on first login.
      // Or they will set password.
      const newDocRef = doc(collection(db, 'users'));
      await setDoc(newDocRef, {
        name: upperName,
        sicilNo: newEmpSicil.trim(),
        email: email,
        role: 'employee',
        shiftType: newEmpShift,
        needsPasswordSetup: true
      });

      Alert.alert('Başarılı', 'Personel eklendi.');
      setModalVisible(false);
      setNewEmpName('');
      setNewEmpSicil('');
    } catch (error) {
      Alert.alert('Hata', 'Personel eklenemedi.');
    }
  };

  const resetHWID = async (empId) => {
    try {
      await updateDoc(doc(db, 'users', empId), { hwid: deleteField() });
      Alert.alert('Başarılı', 'Cihaz kaydı sıfırlandı.');
    } catch(e) {
      Alert.alert('Hata', 'İşlem başarısız.');
    }
  };

  const resetPassword = async (empId) => {
    try {
      Alert.alert('Bilgi', 'Şifre sıfırlama işlemi için sistem yetkisi gerekiyor. Lütfen personelin ilk girişinde yeni şifresini belirlemesini sağlayın. (Arkaplan için not: Firebase kuralları gereği client SDK\'dan başkasının şifresi değiştirilemez, ancak test ortamı için flag güncelleniyor.)');
      // Set the flag. If we had Admin SDK in Cloud Functions, we would call admin.auth().updateUser(uid, {password: 'Mola12345!'}) here.
      await updateDoc(doc(db, 'users', empId), { needsPasswordSetup: true });
    } catch(e) {
      Alert.alert('Hata', 'İşlem başarısız.');
    }
  };

  const getBreakStatus = (uid) => {
    const b = activeBreaks.find(bk => bk.uid === uid);
    if (!b) return 'Mola Yapmıyor';
    if (b.state === 'active') return 'Molada';
    if (b.state === 'paused') return 'Molada (Ara Verdi)';
    return 'Bilinmiyor';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Yönetici Paneli</Text>

      <View style={styles.activeBreaksSummary}>
        <Text style={styles.summaryTitle}>Aktif Mola Durumu</Text>
        {activeBreaks.length === 0 ? <Text>Şu an molada olan personel yok.</Text> : null}
        {activeBreaks.map(b => (
          <Text key={b.id} style={styles.breakItem}>
            {b.userName} - {b.type === 'morning' ? 'Sabah' : b.type === 'noon' ? 'Öğle' : 'Akşam'} ({b.state === 'active' ? 'Aktif' : 'Duraklatıldı'})
          </Text>
        ))}
      </View>

      <View style={styles.listHeaderContainer}>
        <Text style={styles.listHeader}>Personel Listesi</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
          <Text style={styles.addBtnText}>+ Yeni Ekle</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={employees}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.empCard}>
            <View>
              <Text style={styles.empName}>{item.name}</Text>
              <Text style={styles.empSicil}>Sicil: {item.sicilNo}</Text>
              <Text style={styles.empStatus}>Durum: {getBreakStatus(item.uid)}</Text>
            </View>
            <View style={styles.actionBtns}>
              <TouchableOpacity style={[styles.actionBtn, {backgroundColor: '#2196F3', marginBottom: 5}]} onPress={() => openLogsForUser(item.sicilNo)}>
                <Text style={styles.actionText}>Geçmişi Gör</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn} onPress={() => resetHWID(item.id)}>
                <Text style={styles.actionText}>Cihazı Sıfırla</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionBtn, {marginTop: 5, backgroundColor: '#FF9800'}]} onPress={() => resetPassword(item.id)}>
                <Text style={styles.actionText}>Şifre Sıfırla</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.logoutBtn} onPress={() => auth.signOut()}>
        <Text style={styles.logoutText}>Çıkış Yap</Text>
      </TouchableOpacity>

      {/* Add Employee Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Yeni Personel Ekle</Text>

            <TextInput
              style={styles.input}
              placeholder="İSİM SOYİSİM"
              value={newEmpName}
              onChangeText={text => setNewEmpName(text.toUpperCase())}
              autoCapitalize="characters"
            />

            <TextInput
              style={styles.input}
              placeholder="Personel Parmak Sicili"
              value={newEmpSicil}
              onChangeText={setNewEmpSicil}
            />

            <View style={styles.shiftSelector}>
              <Text style={styles.shiftLabel}>Vardiya Seçimi:</Text>
              <View style={styles.shiftBtns}>
                <TouchableOpacity
                  style={[styles.shiftBtn, newEmpShift === 'morning_shift' && styles.shiftBtnActive]}
                  onPress={() => setNewEmpShift('morning_shift')}>
                  <Text style={[styles.shiftBtnText, newEmpShift === 'morning_shift' && styles.shiftBtnTextActive]}>08:00 - 16:30</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.shiftBtn, newEmpShift === 'evening_shift' && styles.shiftBtnActive]}
                  onPress={() => setNewEmpShift('evening_shift')}>
                  <Text style={[styles.shiftBtnText, newEmpShift === 'evening_shift' && styles.shiftBtnTextActive]}>13:00 - 21:30</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.modalBtns}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.btnText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleAddEmployee}>
                <Text style={styles.btnText}>Kaydet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Break Logs Modal */}
      <Modal visible={logsModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, {maxHeight: '80%'}]}>
            <Text style={styles.modalTitle}>Mola Geçmişi</Text>
            {selectedUserLogs.length === 0 ? (
                <Text style={{textAlign: 'center', marginTop: 20}}>Yakın zamanda mola kaydı bulunamadı.</Text>
            ) : (
                <FlatList
                    data={selectedUserLogs}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={{borderBottomWidth: 1, borderColor: '#eee', paddingVertical: 10}}>
                            <Text style={{fontWeight: 'bold'}}>{item.action} ({item.type === 'morning' ? 'Sabah' : item.type === 'noon' ? 'Öğle' : 'Akşam'})</Text>
                            <Text style={{color: '#666'}}>{new Date(item.timestamp).toLocaleString()}</Text>
                        </View>
                    )}
                />
            )}
            <TouchableOpacity style={[styles.cancelBtn, {marginTop: 20}]} onPress={() => setLogsModalVisible(false)}>
                <Text style={styles.btnText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0', paddingTop: 50 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  activeBreaksSummary: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 20, elevation: 2 },
  summaryTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  breakItem: { fontSize: 14, color: '#4CAF50', marginBottom: 5 },
  listHeaderContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  listHeader: { fontSize: 18, fontWeight: 'bold' },
  addBtn: { backgroundColor: '#007AFF', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 5 },
  addBtnText: { color: '#fff', fontWeight: 'bold' },
  empCard: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 1 },
  empName: { fontSize: 16, fontWeight: 'bold' },
  empSicil: { fontSize: 14, color: '#666', marginTop: 2 },
  empStatus: { fontSize: 12, color: '#888', marginTop: 5 },
  actionBtns: { alignItems: 'flex-end' },
  actionBtn: { backgroundColor: '#f44336', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 4 },
  actionText: { color: '#fff', fontSize: 12 },
  logoutBtn: { marginTop: 20, padding: 15, alignItems: 'center' },
  logoutText: { color: '#d32f2f', fontSize: 16, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 6, marginBottom: 15 },
  modalBtns: { flexDirection: 'row', justifyContent: 'space-between' },
  cancelBtn: { backgroundColor: '#888', padding: 12, borderRadius: 6, flex: 1, marginRight: 5, alignItems: 'center' },
  saveBtn: { backgroundColor: '#4CAF50', padding: 12, borderRadius: 6, flex: 1, marginLeft: 5, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  shiftSelector: { marginBottom: 15 },
  shiftLabel: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  shiftBtns: { flexDirection: 'row', justifyContent: 'space-between' },
  shiftBtn: { flex: 1, padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 6, alignItems: 'center', marginHorizontal: 2 },
  shiftBtnActive: { backgroundColor: '#e3f2fd', borderColor: '#2196F3' },
  shiftBtnText: { color: '#666' },
  shiftBtnTextActive: { color: '#2196F3', fontWeight: 'bold' }
});
