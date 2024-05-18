import axios from 'axios';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';
import { PATH_AFTER_LOGIN } from 'src/config-global';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');

  useEffect(() => {
    if (localStorage.getItem('accessToken') && localStorage.getItem('nickname') && localStorage.getItem('userId')) {
      window.location.href = returnTo || '/';
    }
  }, [returnTo])
  const { login } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const {
    reset,
    handleSubmit,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login?.(data.email, data.password);

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">글, 그림</Typography>
    </Stack>
  );

  const handleButtonClick = () => {
    
    const url =
      'http://ec2-3-34-144-29.ap-northeast-2.compute.amazonaws.com:8080/api/v1/auth/oauth2/authorization/kakao';
    const windowFeatures = 'width=500,height=600,left=10,top=10';
    const newWindow = window.open(url, '_blank', windowFeatures);

    const checkWindowClosed = setInterval(() => {
      if (newWindow?.closed) {
        clearInterval(checkWindowClosed);
        // 로그인 창이 닫혔으므로 홈페이지로 이동
        window.location.href = returnTo || '/';
      }
    }, 500);
  };

  const KakaoLoginBtn = (
    <button
      type="button"
      style={{
        display: 'flex',
        justifyContent: 'center',
        border: 'none',
        alignItems: 'center',
        width: '360px',
        height: '56px',
        backgroundColor: '#FEE500',
        borderRadius: '13px',
        color: '#181600',
        fontSize: '23px',
        fontWeight: '900',
        cursor: 'pointer',
      }}
      onClick={handleButtonClick}
    >
      <img
        src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
        width="222"
        alt="카카오 로그인 버튼"
      />
    </button>
  );

  const indiRenderForm = <Stack spacing={2.5}>{KakaoLoginBtn}</Stack>;

  // 로그인 버튼 클릭 시 실행할 함수
  const enterLogin = () => {
    const response = axios
      .post(`https://${encodeURIComponent('글그림')}.com/api/v1/auth/login`, {
        email: methods.getValues('email'),
        password: methods.getValues('password'),
      })
      .then((res) => {
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refrashToken);
        localStorage.setItem('userId', res.data.user_id);
        localStorage.setItem('userType', res.data.userType);
        localStorage.setItem('nickname', res.data.nickname);
        localStorage.setItem('profile', res.data.profile_url);
        router.push('/recruit'); // 홈페이지 URL로 변경해주세요.
      });
    console.log(encodeURIComponent('글그림'));
  };

  const enterRenderForm = (
    <Stack spacing={2.5}>
      <RHFTextField name="email" label="Email address" />

      <RHFTextField
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Link component={RouterLink} href={paths.auth.jwt.register} variant="subtitle2">
        회원가입
      </Link>

      <LoadingButton
        fullWidth
        color="success"
        size="large"
        // type="submit"
        variant="contained"
        // loading={isSubmitting}
        onClick={enterLogin}
      >
        Login
      </LoadingButton>
    </Stack>
  );

  const [alignment, setAlignment] = useState('indi');

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment === null) {
      if (alignment === 'indi') {
        newAlignment = 'indi';
      } else if (alignment === 'enter') {
        newAlignment = 'enter';
      }
    }
    setAlignment(newAlignment);
  };

  const selectUserType = (
    <Stack spacing={1.5}>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="indi" sx={{ width: 1 }}>
          개인 회원
        </ToggleButton>
        <ToggleButton value="enter" sx={{ width: 1 }}>
          기업 회원
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );

  return (
    <>
      {renderHead}

      {selectUserType}

      <br />

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}
      {alignment === 'indi' ? (
        <FormProvider methods={methods} onSubmit={onSubmit}>
          {indiRenderForm}
        </FormProvider>
      ) : (
        <FormProvider methods={methods} onSubmit={onSubmit}>
          {enterRenderForm}
        </FormProvider>
      )}
    </>
  );
}
