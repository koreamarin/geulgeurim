import axiosOrigin from 'axios';
import { initializeApp } from 'firebase/app';
import { useMemo, useEffect, useReducer, useCallback } from 'react';
import { getToken, Messaging, getMessaging } from 'firebase/messaging';

import axios, { endpoints } from 'src/utils/axios';

import { AuthContext } from './auth-context';
import { setSession, isValidToken } from './utils';
import { AuthUserType, ActionMapType, AuthStateType } from '../../types';

// ----------------------------------------------------------------------
/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */
// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };
//
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const res = await axios.get(endpoints.auth.me);

        const { user } = res.data;

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // // 서버로 fcm토큰 전송
  // const sendFcmTokenApi = async (fcmData: fcmDataType) => {
  //   return publicRequest
  //     .post(, fcmData)
  //     .then((res) => res.data)
  //     .catch((error) => {
  //       console.log(error);
  //       throw new Error("fcm 토큰 api 에러");
  //     });
  // };

  // async function requestNotificationPermissionAndGetToken(messagingVal: Messaging, vapidKey: string | undefined) {
  //   try {
  //     const permission = await Notification.requestPermission();
  //     if (permission === 'granted') {
  //       console.log('Notification permission granted.');
  //       // 허용되면 FCM 토큰을 가져옴
  //       const token = await getToken(messagingVal, { vapidKey });
  //       return token;
  //     }
  //       console.log('Unable to get permission to notify.');
  //       return null;  // 권한이 거부되면 null 반환
  //
  //   } catch (error) {
  //     console.error('Error getting notification permission: ', error);
  //     return null;
  //   }
  // }
  //
  // // 서비스워커 등록
  // const registerServiceWorker = () => {
  //   if ("serviceWorker" in navigator) {
  //     window.addEventListener("load", () => {
  //       navigator.serviceWorker
  //         .register("/public/firebase-messaging-sw.js")
  //         .then((registration) => {
  //           // 테스트콘솔
  //           console.log(registration);
  //         })
  //         .catch((err) => {
  //           console.log("Service Worker 등록 실패:", err);
  //         });
  //     });
  //   }
  // };


  // LOGIN
  const login = useCallback(async (email: string, password: string) => {



    const data = {
      email,
      password,
    };

    try {
      console.log('로그인 요청');
      // console.log(email)
      // console.log(password)
      // 로그인 요청
      const res = await axios.post(endpoints.auth.login, data);
      const { accessToken, user } = res.data;
      console.log(user);

      // 세션 설정
      setSession(accessToken);


      // // 알림 권한 요청 및 FCM 토큰 획득
      // const generatedFcmtoken = await requestNotificationPermissionAndGetToken(messaging, import.meta.env.VITE_FIREBASE_VAPID_ID);
      //
      // if(generatedFcmtoken){
      //   const url = 'http://localhost:8080/api/v1/user/fcm';
      //
      //   console.log("token = ", generatedFcmtoken);
      //   console.log("user = ", user.id);
      //   const postData = {
      //     id: 2, // 로그인 유저 아이디로 변경 필요
      //     fcmToken: generatedFcmtoken
      //   };
      //
      //   // Axios를 사용한 POST 요청
      //   axiosOrigin.post(url, postData)
      //     .then((response: { data: any; }) => {
      //       console.log('Server response:', response.data);
      //     })
      //     .catch((error: any) => {
      //       console.error('Error sending token to server:', error);
      //     });
      // }else {
      //   console.log('No FCM token available. Request permission to generate one.');
      // }

        // 로컬 상태 업데이트
        dispatch({
          type: Types.LOGIN,
          payload: {
            user: {
              ...user,
              accessToken,
              // generatedFcmtoken
            },
          },
        });

    } catch (error) {
      console.error('Login failed:', error);
    }
  }, []);

  // // fcm서비스 워커 등록
  // useEffect(() => {
  //   registerServiceWorker();
  // }, []);


  // REGISTER
  const register = useCallback(
    async (email: string, password: string, firstName: string, lastName: string) => {
      const data = {
        email,
        password,
        firstName,
        lastName,
      };

      const res = await axios.post(endpoints.auth.register, data);

      const { accessToken, user } = res.data;

      sessionStorage.setItem(STORAGE_KEY, accessToken);

      dispatch({
        type: Types.REGISTER,
        payload: {
          user: {
            ...user,
            accessToken,
          },
        },
      });
    },
    []
  );

  // LOGOUT
  const logout = useCallback(async () => {
    localStorage.removeItem('token');
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      register,
      logout,
    }),
    [login, logout, register, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
