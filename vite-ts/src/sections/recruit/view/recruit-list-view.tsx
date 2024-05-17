import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, Messaging } from 'firebase/messaging';
import axios from '../../../utils/axios';
import { useEffect } from 'react';

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

async function requestNotificationPermissionAndGetToken(messagingVal: Messaging, vapidKey: string | undefined) {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      // 허용되면 FCM 토큰을 가져옴
      const token = await getToken(messagingVal, { vapidKey });
      return token;
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

  export default function RecruitListView() {

    useEffect(() => {

      // 알림 권한 요청 및 FCM 토큰 획득
      const generatedFcmtoken = requestNotificationPermissionAndGetToken(messaging, import.meta.env.VITE_FIREBASE_VAPID_ID);

      if (generatedFcmtoken) {
        const url = import.meta.env.VITE_BACK_SERVER_URL + '/api/v1/auth/fcm';

        console.log('token = ', generatedFcmtoken);
        console.log('user = ', localStorage.getItem('userId'));
        const postData = {
          id: localStorage.getItem('userId'), // 로그인 유저 아이디로 변경 필요
          fcmToken: generatedFcmtoken,
        };

        // Axios를 사용한 POST 요청
        const response = axios.post(url, postData);
        console.log(response);
      }
      // 반환하는 함수는 컴포넌트가 언마운트될 때 실행됩니다 (클린업 함수)
      return () => {
        console.log('컴포넌트가 언마운트됩니다');
      };
    }, []);

    return (
      <Container>
        <Box>
          구인구직 리스트
        </Box>
      </Container>
    );
  }
