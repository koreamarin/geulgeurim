import axiosOrigin from 'axios';
import { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getToken, Messaging, getMessaging } from 'firebase/messaging';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export default function RecruitListView() {

  async function requestNotificationPermissionAndGetToken(messagingVal: Messaging, vapidKey: string | undefined) {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        // 허용되면 FCM 토큰을 가져옴
        return await getToken(messagingVal, { vapidKey });
      }
      console.log('Unable to get permission to notify.');
      return null;  // 권한이 거부되면 null 반환

    } catch (error) {
      console.error('Error getting notification permission: ', error);
      return null;
    }
  }

// 서비스워커 등록
  const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/public/firebase-messaging-sw.js')
          .then((registration) => {
            // 테스트콘솔
            console.log(registration);
          })
          .catch((err) => {
            console.log('Service Worker 등록 실패:', err);
          });
      });
    }
  };

  function updateFcmToken() {

    // 알림 권한 요청 및 FCM 토큰 획득
    const generatedFcmtoken = requestNotificationPermissionAndGetToken(messaging, import.meta.env.VITE_FIREBASE_VAPID_ID);

    if (generatedFcmtoken) {
      console.log('token = ', generatedFcmtoken);

      // const api = axiosOrigin.create({
      //   baseURL: 'https://글그림.com',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer `, accessToken,
      //   },
      // });

      const requestData = {
        fcmToken: generatedFcmtoken,
      };

      // // 데이터를 POST 방식으로 전송합니다.
      // api.post('/api/v1/auth/fcm', { dto: requestData })
      //   .then(response => {
      //     console.log('Response:', response.data);
      //   })
      //   .catch(error => {
      //     console.error('Error:', error.response);
      //   });

      axiosOrigin
        .post('/api/v1/auth/fcm', requestData, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          },
          baseURL: 'https://글그림.com',
          // baseURL: 'http://localhost:8080',
        })
        .then((response) => {
          console.log( response.data);
        })
        .catch((error) => {
          alert('fcm토큰 업데이트 중 오류가 발생했습니다.');
        });

      localStorage.setItem('tokenUpdated', 'true'); // 토큰 업데이트 후 플래그 설정

    }
  }

  useEffect(() => {
    // 로컬 스토리지에서 accessToken과 updatedFcmToken 값을 가져옵니다.
    const accessToken = localStorage.getItem('accessToken');
    const updatedFcmToken = localStorage.getItem('updatedFcmToken');

    // accessToken이 부여되었고 유저에게 fcmToken 업데이트 안된 경우에만 실행
    if (accessToken && updatedFcmToken === 'false') {
      registerServiceWorker();
      updateFcmToken();

      // FCM 토큰 업데이트를 완료했으므로, updatedFcmToken을 "true"로 설정합니다.
      localStorage.setItem('updatedFcmToken', 'true');
    }
  });

  return (
    <Container>
      <Box>
        구인구직 리스트
      </Box>
    </Container>
  );
}
