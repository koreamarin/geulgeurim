import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFUpload,
  RHFSelect,
  RHFSwitch,
  RHFTextField
} from 'src/components/hook-form';

import { IWorksItem } from 'src/types/works';

// ----------------------------------------------------------------------

type SelectCatgory = {
  label: string,
  value: string
}

type Props = {
  currentPost?: IWorksItem;
};

const categoryList:SelectCatgory[] = [
  {label:'선화', value:'PEN'},
  {label:'채색', value:'COLOR'},
  {label:'배경', value:'BG'},
  {label:'PD', value:'PD'},
  {label:'스토리', value:'STORY'},
  {label:'콘티', value:'CONT'}
]


export default function WorksForm({ currentPost }: Props) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const NewWorksSchema = Yup.object().shape({
    title: Yup.string().required('제목을 입력해주세요'),
    description: Yup.string().required('설명을 입력해주세요'),
    category: Yup.string().required('카테고리를 선택해주세요'),
    // not required
    coverUrl: Yup.mixed<any>().nullable(),
    publish: Yup.boolean()
  });

  const defaultValues = useMemo(
    () => ({
      title: currentPost?.title || '',
      description: currentPost?.description || '',
      category: currentPost?.category || '',
      publish: currentPost?.publish || false,

      coverUrl: currentPost?.coverUrl || null
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
        setValue('coverUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = useCallback(() => {
    setValue('coverUrl', null);
  }, [setValue]);

  const renderDetails = (
    <Grid xsOffset={1} mdOffset={2} xs={10} md={8}>
      <Typography variant="h3">
          작품 등록
          <RHFSwitch name="publish" label="공개여부" />
      </Typography>
      <Card sx={{marginBottom: 4}}>
        <Stack spacing={3} sx={{ p: 3 }}>

          {/* 제목 */}
          <RHFTextField name="title" label="제목" />

          {/* 설명 */}
          <RHFTextField name="description" label="설명" multiline rows={3} />

          {/* 카테고리 */}
          <RHFSelect name="category" label="카테고리">
            <MenuItem value="">None</MenuItem>
            <Divider sx={{ borderStyle: 'dashed' }} />
            {categoryList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </RHFSelect>

        </Stack>
      </Card>
      <Stack spacing={1.5}>
        <Typography variant="h5">작품</Typography>
        <RHFUpload
          name="coverUrl"
          onDrop={handleDrop}
          onDelete={handleRemoveFile}
        />
      </Stack>
    </Grid>
  );


  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Publish"
          sx={{ flexGrow: 1, pl: 3 }}
        />

        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          sx={{ ml: 2 }}
        >
          {!currentPost ? '작품등록' : '수정'}
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}
        {renderActions}
      </Grid>

    </FormProvider>
  );
}
