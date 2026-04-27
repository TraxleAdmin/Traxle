const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

admin.initializeApp();

exports.sendAdminBreakNotification = functions.firestore
  .document('break_logs/{logId}')
  .onCreate(async (snap, context) => {
    const logData = snap.data();

    // We only care about telling admins that a break started, paused, resumed or ended.
    const messageBody = `${logData.userName} - ${logData.action} (${logData.type === 'morning' ? 'Sabah' : logData.type === 'noon' ? 'Öğlen' : 'Akşam'})`;

    try {
      const usersSnapshot = await admin.firestore().collection('users').where('role', '==', 'admin').get();

      const tokens = [];
      usersSnapshot.forEach(doc => {
        const data = doc.data();
        if (data.pushToken) {
          tokens.push(data.pushToken);
        }
      });

      if (tokens.length === 0) {
        console.log('No admin tokens found to send notifications.');
        return null;
      }

      const messages = tokens.map(token => ({
        to: token,
        sound: 'default',
        title: 'Mola Bildirimi',
        body: messageBody,
        data: { logId: context.params.logId },
      }));

      // Use Expo's push notification service API
      await axios.post('https://exp.host/--/api/v2/push/send', messages, {
        headers: {
          'Accept': 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        }
      });

      console.log(`Successfully sent notifications to ${tokens.length} admins.`);
      return null;
    } catch (error) {
      console.error('Error sending push notifications:', error);
      return null;
    }
  });
