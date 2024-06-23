importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js',
);

const firebaseConfig = {
  apiKey: "AIzaSyDc5jCOFT0wleA3i5mjlVCsWxUKCulUETs",
  authDomain: "cqed-4974b.firebaseapp.com",
  projectId: "cqed-4974b",
  storageBucket: "cqed-4974b.appspot.com",
  messagingSenderId: "115585502486",
  appId: "1:115585502486:web:b546f44540c34801045437",
  measurementId: "G-4VD6PPDJXM"
}

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.data.title || 'No Title';
  const notificationOptions = {
    body: payload.data.body || 'No Body',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        if (clientList.length > 0) {
          let client = clientList[0];
          for (let i = 0; i < clientList.length; i++) {
            if (clientList[i].focused) {
              client = clientList[i];
            }
          }
          return client.focus();
        }
        return clients.openWindow('/');
      }),
  );
});

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
