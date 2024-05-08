import * as Yup from 'yup';
import { useState } from 'react';
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
  const { login } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

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
    formState: { isSubmitting },
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

  const NaverLoginBtn = (
    <button
      type="button"
      style={{
        display: 'flex',
        justifyContent: 'center',
        border: 'none',
        alignItems: 'center',
        width: '360px',
        height: '56px',
        backgroundColor: '#0edd6c',
        borderRadius: '13px',
        color: 'white',
        fontSize: '23px',
        fontWeight: '900',
        cursor: 'pointer',
      }}
    >
      네이버 로그인
    </button>
  );

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
    >
      <a href="http://localhost:8080/oauth2/authorization/kakao">카카오 로그인</a>
    </button>
  );

  const indiRenderForm = (
    <Stack spacing={2.5}>
      {NaverLoginBtn}
      {KakaoLoginBtn}
      <Link component={RouterLink} href={paths.auth.jwt.register} variant="subtitle2">
        회원가입
      </Link>
    </Stack>
  );

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
        type="submit"
        variant="contained"
        loading={isSubmitting}
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
          기업회원
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
