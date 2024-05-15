import { Helmet } from 'react-helmet-async';

import { SplashScreen } from 'src/components/loading-screen';

export default function LoginPage() {
  const getQueryStringParams = (query) =>
    query
      ? (/^[?#]/.test(query) ? query.slice(1) : query).split('&').reduce((params, param) => {
          const [key, value] = param.split('=');
          params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
          return params;
        }, {})
      : {};
  const urlParams = getQueryStringParams(window.location.search);
  console.log('확인', urlParams);

  localStorage.setItem('accessToken', urlParams.access_token);
  localStorage.setItem('refreshToken', urlParams.refresh_token);
  localStorage.setItem('userId', urlParams.user_id);
  localStorage.setItem('userType', urlParams.user_type);
  localStorage.setItem('nickname', urlParams.nickname);
  localStorage.setItem('profile', urlParams.profile_url);

  // 창 닫기
  window.close();

  return (
    <>
      <Helmet>
        <title>로그인-test</title>
      </Helmet>
      {urlParams}
      <SplashScreen />
    </>
  );
}
