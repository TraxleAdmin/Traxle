import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile,
  sendEmailVerification,
  deleteUser,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { doc, setDoc, getDoc, deleteDoc, collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";

// ==========================================
// YARDIMCI FONKSİYONLAR (Cihaz & IP Tespiti)
// ==========================================

const getDeviceInfo = () => {
  if (typeof window === 'undefined') return 'Bilinmeyen Cihaz';
  
  const ua = navigator.userAgent;
  let browser = 'Bilinmeyen Tarayıcı';
  let os = 'Bilinmeyen OS';

  if (ua.includes('Firefox') && !ua.includes('Seamonkey')) browser = 'Firefox';
  else if (ua.includes('Seamonkey')) browser = 'Seamonkey';
  else if (ua.includes('Chrome') && !ua.includes('Chromium')) browser = 'Chrome';
  else if (ua.includes('Chromium')) browser = 'Chromium';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('OPR') || ua.includes('Opera')) browser = 'Opera';
  else if (ua.includes('Edg')) browser = 'Edge';

  if (ua.includes('Win')) os = 'Windows PC';
  else if (ua.includes('Mac')) os = 'Mac OS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('like Mac')) os = 'iOS';

  return `${os} / ${browser}`;
};

const logLoginAttempt = async (email: string, status: 'success' | 'failed', uid?: string) => {
  try {
    let targetUid = uid;

    if (!targetUid) {
      const q = query(collection(db, "users"), where("email", "==", email));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        targetUid = snapshot.docs[0].id;
      }
    }

    if (!targetUid) return;

    let ip = 'Bilinmiyor';
    try {
        const ipRes = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipRes.json();
        ip = ipData.ip;
    } catch (e) {
        console.warn("IP Adresi alınamadı.");
    }

    const device = getDeviceInfo();

    await addDoc(collection(db, "user_login_logs"), {
      userId: targetUid,
      email: email,
      ip: ip,
      device: device,
      status: status,
      timestamp: serverTimestamp()
    });

  } catch (err) {
    console.error("Giriş logu yazılamadı:", err);
  }
};


// ==========================================
// ANA AUTH FONKSİYONLARI
// ==========================================

export const registerUser = async (email: string, password: string, userData: any) => {
  try {
    let user;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      user = userCredential.user;
    } catch (authError: any) {
      if (authError.code === 'auth/email-already-in-use') {
        if (auth.currentUser && auth.currentUser.email === email) {
            user = auth.currentUser;
        } else {
            return { success: false, error: "Bu e-posta zaten kullanımda. Lütfen Giriş Yap sayfasını kullanın." };
        }
      } else {
        throw authError; 
      }
    }

    if (!user) throw new Error("Kullanıcı oluşturulamadı.");

    await updateProfile(user, { displayName: userData.name });

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: userData.name,
      email: email,
      recoveryEmail: userData.recoveryEmail || null,
      phone: userData.phone,
      role: userData.role,
      tcKn: userData.tcKn || null,
      licenseClass: userData.licenseClass || null,
      vehicleType: userData.vehicleType || null,
      plateNumber: userData.plateNumber || null,
      companyName: userData.companyName || null,
      taxNumber: userData.taxNumber || null,
      city: userData.city || null,
      createdAt: new Date().toISOString(),
      phoneVerified: true,
      isActive: true
    }, { merge: true });

    return { success: true, user };

  } catch (error: any) {
    let message = "Kayıt işlemi başarısız.";
    if (error.code === 'permission-denied') message = "Veritabanı izni yok.";
    else if (error.message && error.message.includes("offline")) message = "İnternet bağlantısı koptu.";
    return { success: false, error: message + " (" + error.message + ")" };
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await logLoginAttempt(email, 'success', userCredential.user.uid);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    console.error("Giriş Hatası:", error);
    await logLoginAttempt(email, 'failed');

    let message = "Giriş yapılamadı.";
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
      message = "E-posta adresi veya şifre hatalı.";
    } else if (error.code === 'auth/too-many-requests') {
      message = "Çok fazla deneme yaptınız. Lütfen bekleyin.";
    }
    return { success: false, error: message };
  }
};

// 🔥 EKLENDİ: GOOGLE VE APPLE GİRİŞ FONKSİYONU
export const socialLogin = async (providerType: 'google' | 'apple', role: string = 'shipper') => {
  try {
    let provider;
    if (providerType === 'google') {
      provider = new GoogleAuthProvider();
    } else {
      provider = new OAuthProvider('apple.com');
    }

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Kullanıcı veritabanında var mı diye kontrol et
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // Eğer yoksa seçilen rol ile yeni hesap oluştur
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || "Kullanıcı",
        email: user.email,
        phone: user.phoneNumber || null,
        role: role, 
        createdAt: new Date().toISOString(),
        isActive: true,
        emailVerified: true // Sosyal hesaplarda mail onaylanmış kabul edilir
      }, { merge: true });
    }

    await logLoginAttempt(user.email || user.uid, 'success', user.uid);

    return { success: true, user };
  } catch (error: any) {
    console.error(`${providerType} Giriş Hatası:`, error);
    return { success: false, error: error.message };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const sendVerificationEmail = async (user: any) => {
  try {
    await sendEmailVerification(user);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deleteUserAccount = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("Kullanıcı bulunamadı.");
    const uid = user.uid;
    await deleteDoc(doc(db, "users", uid));
    await deleteUser(user);
    return { success: true };
  } catch (error: any) {
    if (error.code === 'auth/requires-recent-login') {
      return { success: false, error: "Güvenlik gereği yeniden giriş yapmalısınız." };
    }
    return { success: false, error: error.message };
  }
};

export const resetUserPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: any) {
    let message = "Şifre sıfırlama bağlantısı gönderilemedi.";
    if (error.code === 'auth/user-not-found') message = "Bu e-posta adresiyle kayıtlı bir hesap bulunamadı.";
    else if (error.code === 'auth/invalid-email') message = "Lütfen geçerli bir e-posta adresi girin.";
    else if (error.code === 'auth/too-many-requests') message = "Çok fazla deneme yaptınız. Lütfen biraz bekleyin.";
    return { success: false, error: message };
  }
};