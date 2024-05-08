import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFUpload,
  RHFSelect,
  RHFTextField
} from 'src/components/hook-form';

import { IWorksItem } from 'src/types/works';

import WorksRHFSwitch from './works-form-switch';

// ----------------------------------------------------------------------

type SelectCatgory = {
  label: string,
  value: string
}

type Props = {
  currentPost?: IWorksItem;
  workId: string
};

const typeList:SelectCatgory[] = [
  {label:'선화', value:'PEN'},
  {label:'채색', value:'COLOR'},
  {label:'배경', value:'BG'},
  {label:'PD', value:'PD'},
  {label:'스토리', value:'STORY'},
  {label:'콘티', value:'CONT'}
]


export default function WorksEdit({ currentPost, workId }: Props) {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewWorksSchema = Yup.object().shape({
    name: Yup.string().required('제목을 입력해주세요'),
    description: Yup.string().required('설명을 입력해주세요'),
    type: Yup.string().required('카테고리를 선택해주세요'),
    // not required
    fileUrl: Yup.mixed<any>().nullable(),
    status: Yup.string().oneOf(['PRIVATE', 'PUBLIC'], '공개 상태를 선택해주세요')
  });

  const defaultValues = useMemo(
    () => ({
      name: currentPost?.name || '',
      description: currentPost?.description || '',
      type: currentPost?.type || '',
      status: currentPost?.status || 'PRIVATE',

      fileUrl: currentPost?.fileUrl || null
    }),
    [currentPost]
  );

  const methods = useForm({
    resolver: yupResolver(NewWorksSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentPost) {
      reset(defaultValues);
    }
  }, [currentPost, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      // api로 바꿔야함
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentPost ? '작품 수정 성공!' : '작품 등록 성공!');
      router.push(paths.mypage.works);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('fileUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = useCallback(() => {
    setValue('fileUrl', null);
  }, [setValue]);

  const renderDetails = (
    <Grid xsOffset={1} mdOffset={2} xs={10} md={8}>
      <Typography variant="h3" sx={{display:'flex',  justifyContent: 'space-between',}}>
          작품 등록
          <WorksRHFSwitch name="status" label="공개여부" />
      </Typography>
      <Card sx={{marginBottom: 4}}>
        <Stack spacing={3} sx={{ p: 3 }}>

          {/* 제목 */}
          <RHFTextField name="name" label="제목" />

          {/* 설명 */}
          <RHFTextField name="description" label="설명" multiline rows={8} />

          {/* 카테고리 */}
          <RHFSelect name="type" label="카테고리">
            <MenuItem value="">None</MenuItem>
            <Divider sx={{ borderStyle: 'dashed' }} />
            {typeList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </RHFSelect>

        </Stack>
      </Card>
      <Stack spacing={1.5}>
        <Typography variant="h5">작품</Typography>
        {/* 업로드 */}
        <RHFUpload
          name="fileUrl"
          onDrop={handleDrop}
          onDelete={handleRemoveFile}
        />
      </Stack>
      <LoadingButton
          type="submit"
          style={{height:'2.8rem', fontSize:'1rem'}} variant="outlined" color="success" size="medium" sx={{marginRight:3}}
          loading={isSubmitting}
        >
          {!currentPost ? '작품등록' : '수정하기'}
        </LoadingButton>
    </Grid>
  );



  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}
      </Grid>
    </FormProvider>
  );
}
