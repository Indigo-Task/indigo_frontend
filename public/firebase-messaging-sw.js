importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyAADXsSKQAx6jvC-JWwboY1608A__qQH5U",
    authDomain: 'flight-status-tracker-ec04b.firebaseapp.com',
    projectId: "flight-status-tracker-ec04b",
    storageBucket: "flight-status-tracker-ec04b.appspot.com",
    messagingSenderId: "521982700950",
    appId: "1:521982700950:web:4e4b7872aa4a80a00e41b7"
  };
  firebase.initializeApp(firebaseConfig);

  // Retrieve Firebase Messaging instance
  const messaging = firebase.messaging();
  
  // Background message handler
  messaging.onBackgroundMessage((payload) => {
    console.log('Received background message ', payload);
    const notificationTitle = "Flight Status Update";
    const notificationOptions = {
      body: payload.data.message,
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });