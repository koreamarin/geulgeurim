self.addEventListener("install", function (e) {
  console.log("fcm sw install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm sw activate..");
});

// 푸시 알림에 이미지 넣기 위한 설정
self.addEventListener("push", function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image, // 웹 푸시 이미지는 icon
    tag: resultData.tag,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 어디로 라우팅 할지 설정
self.addEventListener("notificationclick", function (event) {
  console.log("notification click");
  const url = "/alert";
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
