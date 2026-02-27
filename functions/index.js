const { onDocumentCreated, onDocumentUpdated } = require("firebase-functions/v2/firestore");
const { setGlobalOptions } = require("firebase-functions/v2");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// 🔥 1. DEĞİŞİKLİK: Bölgeyi ve kuralları tek bir merkezden global olarak atıyoruz
setGlobalOptions({ maxInstances: 10, region: "europe-west3" });

// 🔥 2. DEĞİŞİKLİK: V2'de "event" objesi gelir, veriye "event.data" ile ulaşırız.
exports.onusercreated = onDocumentCreated("users/{userId}", async (event) => {
    const snap = event.data;
    if (!snap) return;
    const data = snap.data();
    
    if (data.role === "driver") {
        await db.collection("system").doc("stats").set({
            totalDrivers: admin.firestore.FieldValue.increment(1)
        }, { merge: true });
    }
});

exports.onloadcreated = onDocumentCreated("loads/{loadId}", async (event) => {
    const snap = event.data;
    if (!snap) return;
    
    await db.collection("system").doc("stats").set({
        totalLoads: admin.firestore.FieldValue.increment(1)
    }, { merge: true });
});

// 🔥 3. DEĞİŞİKLİK: "onUpdate" yerine "onDocumentUpdated" kullanıyoruz
exports.onloadupdated = onDocumentUpdated("loads/{loadId}", async (event) => {
    const snap = event.data;
    if (!snap) return;

    // V2'de eski ve yeni veriye ulaşım şekli
    const before = snap.before.data();
    const after = snap.after.data();

    if (before.status !== "Teslim Edildi" && after.status === "Teslim Edildi") {
        await db.collection("system").doc("stats").set({
            completedLoads: admin.firestore.FieldValue.increment(1)
        }, { merge: true });
    }
});