import axios from 'axios';
import * as Yup from 'yup';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';
import { UploadBox } from 'src/components/upload';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .required('이메일은 필수입력 사항입니다.')
      .email('올바른 이메일 형식을 사용하세요.'),
    password: Yup.string().required('비밀번호는 필수입력 사항입니다.'),
    representative: Yup.string().required('대표자명은 필수입력 사항입니다.'),
    manager: Yup.string().required('담당자명은 필수입력 사항입니다.'),
    opening: Yup.mixed<any>().required('개업일은 필수입력 사항입니다.'),
    business_name: Yup.string().required('회사명은 필수입력 사항입니다.'),
    address: Yup.string().required('주소는 필수입력 사항입니다.'),
    company_num: Yup.string().required('사업자 등록번호는 필수입력 사항입니다.'),
    phone_num: Yup.string().required('핸드폰 번호는 필수입력 사항입니다.'),
    business_license: Yup.mixed<any>().required('사업자 등록증은 필수입력 사항입니다.'),
    // .test(
    //   'fileSize',
    //   '파일 크기가 너무 큽니다.',
    //   (value) => value && value.size <= 10000000 // 10MB
    // )
    // .test(
    //   'fileType',
    //   '지원되지 않는 파일 형식입니다.',
    //   (value) => value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type)
    // ),
  });

  const defaultValues = {
    email: '',
    password: '',
    opening: null,
    business_name: '',
    address: '',
    company_num: '',
    phone_num: '',
    business_license: 'ㄴㅇㅀㄴㅇㅀ',
    representative: '',
    manager: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const enterUserSignUpRequest = {
        email: data.email,
        password: data.password,
        representative: data.representative,
        manager: data.manager,
        opening: data.opening,
        business_name: data.business_name,
        address: data.address,
        company_num: data.company_num,
        phone_num: data.phone_num,
      };

      const image_file = data.business_license[0];

      const formData = new FormData();
      formData.append('image', image_file);
      formData.append('enterUserSignUpRequest', JSON.stringify(enterUserSignUpRequest));

      const response = await axios.post('https://xn--2i0bpa721g.com/api/auth/signup', formData);
      console.log(response.data);

      router.push('/');
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h3">환영합니다!</Typography>
        <br />
        <div style={{ fontWeight: '800' }}>웹소설, 웹툰 창작자 중계 솔루션 글그림.</div>
        <div style={{ fontWeight: '800' }}>지금 바로 시작해보세요.</div>
      </div>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> 이미 계정을 가지고 있으신가요? </Typography>

        <Link href={paths.auth.jwt.login} component={RouterLink} variant="subtitle2">
          로그인
        </Link>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        mt: 2.5,
        textAlign: 'center',
        typography: 'caption',
        color: 'text.secondary',
      }}
    >
      {'By signing up, I agree to '}
      <Link underline="always" color="text.primary">
        Terms of Service
      </Link>
      {' and '}
      <Link underline="always" color="text.primary">
        Privacy Policy
      </Link>
      .
    </Typography>
  );

  const renderForm = (
    <Stack spacing={1.5}>
      <RHFTextField name="email" label="이메일 아이디" />
      <RHFTextField
        name="password"
        label="비밀번호"
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
      <RHFTextField name="representative" label="대표자명" />
      <RHFTextField name="manager" label="담당자명" />
      <Controller
        name="opening"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            {...field}
            label="개업일"
            // format="dd/MM/yyyy"
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!error,
                helperText: error?.message,
              },
            }}
          />
        )}
      />
      <RHFTextField name="business_name" label="회사명" />
      <RHFTextField name="address" label="주소" />
      <RHFTextField name="company_num" label="사업자 등록번호" />
      <RHFTextField name="phone_num" label="핸드폰 번호" />

      <Controller
        name="business_license"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <UploadBox
            file={field.value}
            error={!!error}
            placeholder={
              <Stack spacing={0.5} alignItems="center">
                <Iconify icon="eva:cloud-upload-fill" width={40} />
                <Typography variant="body2">사업자 등록증 첨부</Typography>
              </Stack>
            }
            sx={{ flexGrow: 1, height: 'auto', py: 2.5, mb: 3, width: '100%' }}
          />
        )}
      />

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Create account
      </LoadingButton>
    </Stack>
  );
  console.log(errors);

  return (
    <>
      {renderHead}

      {!!errorMsg && (
        <Alert severity="error" sx={{ m: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </FormProvider>
    </>
  );
}
