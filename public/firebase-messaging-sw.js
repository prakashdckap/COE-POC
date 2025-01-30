// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyDvdNVxbqsnaBYXuTromYbNHr66k-8p4yE",
  authDomain: "dckap-2a059.firebaseapp.com",
  projectId: "dckap-2a059",
  storageBucket: "dckap-2a059.appspot.com",
  messagingSenderId: "373748373506",
  appId: "1:373748373506:web:0b48be47d01590ae45af1b",
  measurementId: "G-673S38ESFD",
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./logo.png",
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
});
