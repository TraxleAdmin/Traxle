import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { auth, db } from '../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updatePassword } from 'firebase/auth';
import { collection, query, where, getDocs, updateDoc, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import * as Application from 'expo-application';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [sicilNo, setSicilNo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [userDocId, setUserDocId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [deviceHWID, setDeviceHWID] = useState(null);
  const { triggerRefresh } = useAuth();

  useEffect(() => {
    const getHWID = async () => {
      let hwid;
      if (Platform.OS === 'android') {
        hwid = Application.androidId;
      } else {
        // iOS doesn't have a persistent unique ID that survives uninstalls unless we use secure storage
        // Application.getIosIdForVendorAsync() is good enough for vendor specific
        hwid = await Application.getIosIdForVendorAsync();
      }
      setDeviceHWID(hwid);
    };
    getHWID();
  }, []);

  const handleSicilSubmit = async () => {
    if (!sicilNo.trim()) {
      Alert.alert('Hata', 'Lütfen sicil numaranızı giriniz.');
      return;
    }
    setLoading(true);
    try {
      // Find user by sicilNo in Firestore
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('sicilNo', '==', sicilNo.trim()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // --- ADMIN INITIALIZATION BACKDOOR ---
        if (sicilNo.trim().toUpperCase() === 'ADMIN') {
           const newAdminId = 'admin_init_' + Date.now();
           await setDoc(doc(db, 'users', newAdminId), {
             name: 'Sistem Yöneticisi',
             sicilNo: 'ADMIN',
             role: 'admin',
             email: 'admin@molatik.com',
             needsPasswordSetup: true,
             hwid: null
           });
           Alert.alert('Sistem Kurulumu', 'İlk yönetici hesabı oluşturuldu!\nLütfen DEVAM ET diyerek şifrenizi belirleyin.');
           setLoading(false);
           return;
        }
        Alert.alert('Hata', 'Bu sicil numarasına ait kullanıcı bulunamadı.');
        setLoading(false);
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      setUserDocId(userDoc.id);
      setUserEmail(userData.email);

      // Check if it's first login (needs password setup)
      if (userData.needsPasswordSetup) {
        setIsFirstLogin(true);
      } else {
        setIsFirstLogin(false);
      }

      // We don't login here, we just show password field
    } catch (error) {
      console.error(error);
      Alert.alert('Hata', 'Kullanıcı kontrolü sırasında bir hata oluştu.');
    }
    setLoading(false);
  };

  const handleLoginOrSetup = async () => {
    if (!password) {
      Alert.alert('Hata', 'Lütfen şifrenizi giriniz.');
      return;
    }

    setLoading(true);
    try {
      if (isFirstLogin) {
        try {
          // If the account does not exist, this will succeed.
          await createUserWithEmailAndPassword(auth, userEmail, password);

          const uid = auth.currentUser.uid;
          const oldUserRef = doc(db, 'users', userDocId);
          const oldSnap = await getDoc(oldUserRef);

          // Migrate data to a document with ID = uid so AuthContext can find it
          const newUserRef = doc(db, 'users', uid);
          await setDoc(newUserRef, {
              ...oldSnap.data(),
              needsPasswordSetup: false,
              uid: uid,
              hwid: deviceHWID
          });

          // Delete old doc
          await deleteDoc(oldUserRef);
        } catch (e) {
            if(e.code === 'auth/email-already-in-use') {
                 // The auth account exists. This means they are doing a password reset.
                 // Since we don't have their old password to login and updatePassword,
                 // and we don't have Admin SDK to reset it, we will create a NEW auth account
                 // with a timestamped email and update their Firestore doc to link to it.
                 try {
                     const newEmail = `${sicilNo.trim().toLowerCase()}_${Date.now()}@molatik.com`;
                     await createUserWithEmailAndPassword(auth, newEmail, password);

                     const uid = auth.currentUser.uid;
                     const oldUserRef = doc(db, 'users', userDocId);
                     const oldSnap = await getDoc(oldUserRef);

                     // Migrate data
                     const newUserRef = doc(db, 'users', uid);
                     await setDoc(newUserRef, {
                         ...oldSnap.data(),
                         needsPasswordSetup: false,
                         uid: uid,
                         email: newEmail, // Update their email to the new one
                         hwid: deviceHWID
                     });

                     await deleteDoc(oldUserRef);
                 } catch (innerErr) {
                     throw new Error('Şifre sıfırlama başarısız. Lütfen yöneticinizle iletişime geçin.');
                 }
            } else {
                throw e;
            }
        }
        triggerRefresh(); // Force the auth context to refetch the document since we just migrated it
      } else {
        // Normal Login
        await signInWithEmailAndPassword(auth, userEmail, password);

        // Verify HWID
        const userRef = doc(db, 'users', userDocId);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();

        if (userData.hwid && userData.hwid !== deviceHWID) {
          auth.signOut();
          Alert.alert('Erişim Engellendi', 'Bu hesaba sadece kayıtlı cihazdan giriş yapılabilir. Cihazınız değiştiyse yöneticinize başvurun.');
          setLoading(false);
          return;
        } else if (!userData.hwid) {
            // If hwid is somehow empty, set it
            await updateDoc(userRef, { hwid: deviceHWID });
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Hata', error.message || 'Giriş yapılamadı. Şifrenizi kontrol edin.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Molatik Giriş</Text>

      {!userDocId ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Sicil No (Örn: PERSONEL PARMAK SİCİLİ)"
            value={sicilNo}
            onChangeText={setSicilNo}
            autoCapitalize="characters"
          />
          <TouchableOpacity style={styles.button} onPress={handleSicilSubmit} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Devam Et</Text>}
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.subtitle}>
            {isFirstLogin ? 'Lütfen yeni şifrenizi belirleyin' : 'Lütfen şifrenizi girin'}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Şifre"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleLoginOrSetup} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{isFirstLogin ? 'Şifre Belirle ve Gir' : 'Giriş Yap'}</Text>}
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => { setUserDocId(null); setPassword(''); setIsFirstLogin(false); }}>
            <Text style={styles.backButtonText}>Geri Dön</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    color: '#666',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
  }
});
