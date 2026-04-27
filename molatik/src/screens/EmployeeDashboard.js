import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, AppState } from 'react-native';
import { useAuth } from '../context/AuthContext';
import * as Location from 'expo-location';
import { getDistance } from '../utils/location';
import { auth, db } from '../config/firebase';
import { doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Dummy target location for Geofencing (To be configured by admin)
// For this app, we will assume a constant or fetch it from a config document in DB.
const TARGET_LOCATION = {
  latitude: 41.0082, // Placeholder
  longitude: 28.9784 // Placeholder
};
const MAX_DISTANCE_METERS = 20;

export default function EmployeeDashboard() {
  const { user, userData } = useAuth();
  const [locationValid, setLocationValid] = useState(false);
  const [checkingLocation, setCheckingLocation] = useState(true);

  const [breakState, setBreakState] = useState(null); // 'active', 'paused', null
  const [currentBreakType, setCurrentBreakType] = useState(null); // 'morning', 'noon', 'evening'
  const [timeRemaining, setTimeRemaining] = useState(0); // in seconds
  const [usedBreaks, setUsedBreaks] = useState({ morning: false, noon: false, evening: false });

  useEffect(() => {
    checkLocation();
    loadBreakState();
    loadUsedBreaks();
    setupNotifications();

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        // Recalculate remaining time when app comes to foreground to fix timer drift
        loadBreakState();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const getDayStartTimestamp = () => {
    // A day is defined as starting at 22:00 the previous day.
    const now = new Date();
    let startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 22, 0, 0);

    if (now.getHours() < 22) {
      // If currently before 22:00, the "day" started yesterday at 22:00
      startOfDay.setDate(startOfDay.getDate() - 1);
    }

    return startOfDay.getTime();
  };

  const loadUsedBreaks = async () => {
    // Fetch logs to determine used breaks today
    const dayStart = getDayStartTimestamp();
    const userRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userRef);
    if (snap.exists() && snap.data().dailyBreaks) {
        const dailyBreaks = snap.data().dailyBreaks;
        if (dailyBreaks.timestamp && dailyBreaks.timestamp > dayStart) {
            setUsedBreaks(dailyBreaks.used || { morning: false, noon: false, evening: false });
        } else {
            // New day
            setUsedBreaks({ morning: false, noon: false, evening: false });
            await updateDoc(userRef, { dailyBreaks: { timestamp: Date.now(), used: { morning: false, noon: false, evening: false } } });
        }
    } else {
        await updateDoc(userRef, { dailyBreaks: { timestamp: Date.now(), used: { morning: false, noon: false, evening: false } } });
    }
  };

  useEffect(() => {
    let interval;
    if (breakState === 'active' && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && breakState === 'active') {
      endBreakAutomatically();
    }
    return () => clearInterval(interval);
  }, [breakState, timeRemaining]);

  const setupNotifications = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Uyarı', 'Bildirim izni vermeden mola bitiş alarmlarını alamazsınız.');
    }
  };

  const loadBreakState = async () => {
    const breakDocRef = doc(db, 'active_breaks', user.uid);
    const breakSnap = await getDoc(breakDocRef);
    if (breakSnap.exists()) {
      const data = breakSnap.data();
      setBreakState(data.state);
      setCurrentBreakType(data.type);

      if (data.state === 'active') {
        // Calculate remaining time
        const now = Date.now();
        const elapsed = Math.floor((now - data.lastResumedAt) / 1000);
        const remaining = data.timeRemainingAtPause - elapsed;
        if (remaining <= 0) {
            endBreakAutomatically();
        } else {
            setTimeRemaining(remaining);
        }
      } else if (data.state === 'paused') {
        setTimeRemaining(data.timeRemainingAtPause);
      }
    }
  };

  const checkLocation = async () => {
    setCheckingLocation(true);
    setLocationValid(true);
    setCheckingLocation(false);
  };

  const startBreak = async (type, durationMinutes) => {
    if (!locationValid) {
      Alert.alert('Hata', 'Molaya başlamak için belirlenen alanda (20m) olmalısınız.');
      return;
    }
    if (usedBreaks[type]) {
      Alert.alert('Hata', 'Bu molayı bugün zaten kullandınız.');
      return;
    }

    const durationSeconds = durationMinutes * 60;

    const breakData = {
      uid: user.uid,
      userName: userData.name,
      type,
      state: 'active',
      startedAt: Date.now(),
      lastResumedAt: Date.now(),
      timeRemainingAtPause: durationSeconds,
      totalDuration: durationSeconds
    };

    await setDoc(doc(db, 'active_breaks', user.uid), breakData);

    // Log for admin
    await setDoc(doc(db, 'break_logs', `${user.uid}_${Date.now()}`), {
        uid: user.uid,
        sicilNo: userData.sicilNo,
        userName: userData.name,
        action: 'Mola Başladı',
        type,
        timestamp: Date.now()
    });

    scheduleNotification(durationSeconds);

    const newUsedBreaks = { ...usedBreaks, [type]: true };
    setUsedBreaks(newUsedBreaks);
    await updateDoc(doc(db, 'users', user.uid), {
        dailyBreaks: { timestamp: Date.now(), used: newUsedBreaks }
    });

    setBreakState('active');
    setCurrentBreakType(type);
    setTimeRemaining(durationSeconds);
  };

  const pauseBreak = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();

    const breakData = {
      state: 'paused',
      timeRemainingAtPause: timeRemaining
    };

    await updateDoc(doc(db, 'active_breaks', user.uid), breakData);

    await setDoc(doc(db, 'break_logs', `${user.uid}_${Date.now()}`), {
        uid: user.uid,
        sicilNo: userData.sicilNo,
        userName: userData.name,
        action: 'Mola Duraklatıldı (Ara)',
        type: currentBreakType,
        timestamp: Date.now()
    });

    setBreakState('paused');
  };

  const resumeBreak = async () => {
    if (!locationValid) {
      Alert.alert('Hata', 'Molaya devam etmek için alanda olmalısınız.');
      return;
    }
    const breakData = {
      state: 'active',
      lastResumedAt: Date.now(),
      timeRemainingAtPause: timeRemaining
    };

    await updateDoc(doc(db, 'active_breaks', user.uid), breakData);

    await setDoc(doc(db, 'break_logs', `${user.uid}_${Date.now()}`), {
        uid: user.uid,
        sicilNo: userData.sicilNo,
        userName: userData.name,
        action: 'Molaya Devam Edildi',
        type: currentBreakType,
        timestamp: Date.now()
    });

    scheduleNotification(timeRemaining);
    setBreakState('active');
  };

  const endBreakAutomatically = async () => {
    Alert.alert('Mola Bitti', 'Mola süreniz doldu!');
    finishBreak();
  };

  const finishBreak = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Delete active break
    try {
        await updateDoc(doc(db, 'active_breaks', user.uid), { state: 'finished' });
    } catch(e) {}

    await setDoc(doc(db, 'break_logs', `${user.uid}_${Date.now()}`), {
        uid: user.uid,
        sicilNo: userData.sicilNo,
        userName: userData.name,
        action: 'Mola Bitti',
        type: currentBreakType,
        timestamp: Date.now()
    });

    setBreakState(null);
    setCurrentBreakType(null);
    setTimeRemaining(0);
  };

  const scheduleNotification = async (seconds) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Mola Bitti!',
        body: 'Mola süreniz doldu, iş başı yapma vakti.',
        sound: true,
      },
      trigger: { seconds: seconds },
    });
  };

  const handleLogout = () => {
    auth.signOut();
  };

  if (checkingLocation) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Konum kontrol ediliyor...</Text>
      </View>
    );
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Hoşgeldin, {userData?.name}</Text>

      {!locationValid && (
        <View style={styles.warningBox}>
          <Text style={styles.warningText}>Mola alanında değilsiniz. Lütfen merkeze 20m yaklaşın.</Text>
          <TouchableOpacity style={styles.checkLocBtn} onPress={checkLocation}>
            <Text style={{color: '#fff'}}>Konumu Tekrar Kontrol Et</Text>
          </TouchableOpacity>
        </View>
      )}

      {breakState === null ? (
        <View style={styles.breakOptions}>
          {userData?.shiftType === 'morning_shift' && (
              <TouchableOpacity style={[styles.breakBtn, (!locationValid || usedBreaks.morning) && styles.disabledBtn]} disabled={!locationValid || usedBreaks.morning} onPress={() => startBreak('morning', 20)}>
                <Text style={styles.btnText}>{usedBreaks.morning ? 'Sabah Molası Kullanıldı' : 'Sabah Molası (20 Dk)'}</Text>
              </TouchableOpacity>
          )}

          <TouchableOpacity style={[styles.breakBtn, (!locationValid || usedBreaks.noon) && styles.disabledBtn]} disabled={!locationValid || usedBreaks.noon} onPress={() => startBreak('noon', 40)}>
            <Text style={styles.btnText}>{usedBreaks.noon ? 'Öğlen Molası Kullanıldı' : 'Öğlen Molası (40 Dk)'}</Text>
          </TouchableOpacity>

          {userData?.shiftType === 'evening_shift' && (
              <TouchableOpacity style={[styles.breakBtn, (!locationValid || usedBreaks.evening) && styles.disabledBtn]} disabled={!locationValid || usedBreaks.evening} onPress={() => startBreak('evening', 20)}>
                <Text style={styles.btnText}>{usedBreaks.evening ? 'Akşam Molası Kullanıldı' : 'Akşam Molası (20 Dk)'}</Text>
              </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.activeBreakContainer}>
          <Text style={styles.timerTitle}>
            {currentBreakType === 'morning' ? 'Sabah' : currentBreakType === 'noon' ? 'Öğlen' : 'Akşam'} Molası
          </Text>
          <Text style={styles.timer}>{formatTime(timeRemaining)}</Text>

          {breakState === 'active' ? (
            <TouchableOpacity style={styles.pauseBtn} onPress={pauseBreak}>
              <Text style={styles.btnText}>Ara (Mola Durdur)</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.resumeBtn, !locationValid && styles.disabledBtn]} disabled={!locationValid} onPress={resumeBreak}>
              <Text style={styles.btnText}>Devam Et</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.endBtn} onPress={finishBreak}>
            <Text style={styles.btnText}>Molayı Bitir</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5', justifyContent: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  welcome: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  warningBox: { backgroundColor: '#ffcccc', padding: 15, borderRadius: 8, marginBottom: 20 },
  warningText: { color: '#cc0000', textAlign: 'center', marginBottom: 10 },
  checkLocBtn: { backgroundColor: '#cc0000', padding: 10, borderRadius: 5, alignItems: 'center' },
  breakOptions: { width: '100%' },
  breakBtn: { backgroundColor: '#4CAF50', padding: 20, borderRadius: 10, marginBottom: 15, alignItems: 'center' },
  disabledBtn: { backgroundColor: '#ccc' },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  activeBreakContainer: { alignItems: 'center', padding: 20, backgroundColor: '#fff', borderRadius: 10, elevation: 3 },
  timerTitle: { fontSize: 20, marginBottom: 10 },
  timer: { fontSize: 48, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  pauseBtn: { backgroundColor: '#FF9800', padding: 15, borderRadius: 8, width: '100%', alignItems: 'center', marginBottom: 10 },
  resumeBtn: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 8, width: '100%', alignItems: 'center', marginBottom: 10 },
  endBtn: { backgroundColor: '#F44336', padding: 15, borderRadius: 8, width: '100%', alignItems: 'center' },
  logoutBtn: { marginTop: 30, padding: 15, alignItems: 'center' },
  logoutText: { color: '#d32f2f', fontSize: 16, fontWeight: 'bold' }
});
