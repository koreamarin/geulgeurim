import * as Yup from 'yup';
import { useForm, useWatch  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { useSnackbar } from 'src/components/snackbar';
import SvgColor from 'src/components/svg-color/svg-color';
import FormProvider, {
  RHFUpload,
  RHFSelect,
  RHFTextField
} from 'src/components/hook-form';

import WorksRHFSwitch from './works-form-switch';
import NFTRegistrationModal from './works-edit-NFT';
import WorksDetailDelete from './works-detail-delete';

// ----------------------------------------------------------------------
function createDummyData(piece_id: number, fileUrl: string, type: string, name: string, create_at: Date, description: string,  nft_type: string, status:string) {
  const date:string = create_at.toLocaleDateString()
  return { piece_id, fileUrl, type, name, description, nft_type, status, date };
}

const dummy = [
  createDummyData(1, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_1.jpg', 'PEN', '그림1', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'NFT', 'PRIVATE'),
  createDummyData(2, '', 'STORY', '스토리1', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'URL', 'PRIVATE'),
  createDummyData(3, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_2.jpg', 'COLOR', '그림2', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'URL', 'PUBLIC'),
  createDummyData(4, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_3.jpg', 'BG', '그림3', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'URL', 'PUBLIC'),
  createDummyData(5, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_4.jpg', 'PD', '그림4', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'URL', 'PUBLIC'),
  createDummyData(6, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_5.jpg', 'CONT', '그림5', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'URL', 'PRIVATE'),
  createDummyData(7, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_6.jpg', 'PEN', '그림6', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'URL', 'PUBLIC'),
  createDummyData(8, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_7.jpg', 'PEN', '그림7', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'URL', 'PRIVATE'),
  createDummyData(9, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_8.jpg', 'PEN', '그림8', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'NFT', 'PUBLIC'),
  createDummyData(10, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_9.jpg', 'PEN', '그림9', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'NFT', 'PRIVATE'),
  createDummyData(11, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_10.jpg', 'PEN', '그림10', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'NFT', 'PUBLIC'),
  createDummyData(12, 'https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_11.jpg', 'PEN', '그림11', new Date('2024-05-03'), '그림 설명하기 귀찮아요...', 'NFT', 'PUBLIC'),
];

type SelectCatgory = {
  label: string,
  value: string
}

type Props = {
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


export default function WorksEdit({ workId }: Props) {
  const router = useRouter();

  const dummyData = dummy.find((item) => item.piece_id === parseInt(workId, 10))

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
      piece_id: dummyData?.piece_id,
      nft_type: dummyData?.nft_type,

      name: dummyData?.name || '',
      description: dummyData?.description || '',
      type: dummyData?.type || '',
      status: dummyData?.status || 'PRIVATE',

      fileUrl: dummyData?.fileUrl || null
    }),
    [dummyData]
  );


  const methods = useForm({
    resolver: yupResolver(NewWorksSchema),
    defaultValues,
    mode: 'onChange'
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isDirty },
    control
  } = methods;

  useEffect(() => {
    if (dummyData) {
      reset(defaultValues);
    }
  }, [dummyData, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    // 변화 없을 때 바로 route
    if (!isDirty) {
      console.log('not change')
      router.push(paths.mypage.worksDetail(parseInt(workId, 10)));
    } else {
    try {
      // api로 바꿔야함
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar('작품 수정 성공!');
      router.push(paths.mypage.worksDetail(parseInt(workId, 10)));
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }}
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

  // NFT 등록 창 띄우기
  const [nftRegister, setNftRegister] = useState<boolean>(false);

  const handleOpenRegister = () => {
    setNftRegister(true)
  }
  const handleCloseRegister = () => setNftRegister(false);


  const checkNFT = dummyData?.nft_type === 'NFT'


  const handleRemoveFile = useCallback(() => {
    setValue('fileUrl', null);
  }, [setValue]);

  const watchedFileUrl = useWatch({
    control,
    name: 'fileUrl', // 관찰할 필드 이름
  });

  const view = useBoolean();
  const selectVariant = 'zoomIn'

  const renderDetails = (
    <Grid xsOffset={1} mdOffset={2} xs={10} md={8}>
      {/* {!isDirty && '확인중'} */}
      <Typography variant="h3" sx={{display:'flex',  justifyContent: 'space-between',}}>
          작품 수정
          <WorksRHFSwitch name="status" label="공개여부" labelPlacement='start'/>
      </Typography>
      <Card sx={{marginBottom: 4}}>
        <Stack spacing={3} sx={{ p: 3 }}>

          {/* 제목 */}
          <RHFTextField name="name" label="제목" />

          {/* 설명 */}
          <RHFTextField name="description" label="설명" multiline rows={8} />

          {/* 카테고리 */}
          <RHFSelect name="type" label="카테고리">
            <MenuItem>선택해주세요</MenuItem>
            <Divider sx={{ borderStyle: 'dashed' }} />
            {typeList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </RHFSelect>

        </Stack>
      </Card>
      <Stack spacing={1.5} mb={4}>
        <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack direction="row" alignItems="center" justifyContent="end">
            작품
            {checkNFT && <SvgColor src='/assets/icons/mypage/ic_nft.svg' ml={2} sx={{ width: 20, height: 20 }}/>}
          </Stack>
          {dummyData?.nft_type !== 'NFT' && watchedFileUrl && <Tooltip title="이미 NFT 작품입니다" disableHoverListener={dummyData?.nft_type !== 'NFT'}>
            <div>
              <Button disabled={checkNFT}
                  style={{height:'2.8rem', fontSize:'1rem'}} variant="outlined" color="info" size="medium" onClick={handleOpenRegister}>
                NFT 등록
              </Button>
            </div>
          </Tooltip>}
        </Typography>
        <NFTRegistrationModal open={nftRegister} onClose={handleCloseRegister} worksId={dummyData?.piece_id} fileUrl={dummyData?.fileUrl}/>
        {/* 업로드, NFT 여부를 통한 수정 확인 */}
        {dummyData?.nft_type === 'NFT' &&
          <Tooltip title="NFT 작품은 수정할 수 없습니다">
            <div>
              <RHFUpload
                name="fileUrl"
                onDrop={handleDrop}
                disabled={checkNFT}
              />
            </div>
          </Tooltip>}
        {dummyData?.nft_type === 'URL' &&
        <RHFUpload
          name="fileUrl"
          onDrop={handleDrop}
          onDelete={handleRemoveFile}
        />}

      </Stack>
      <Stack mb={4} direction="row" alignItems="center" justifyContent="space-between">
          <WorksDetailDelete
          open={view.value}
          onOpen={view.onTrue}
          onClose={view.onFalse}
          selectVariant={selectVariant}
          deleteWorks={workId}
          />

        <Stack direction="row" alignItems="center" justifyContent="end">
          <Button
              style={{height:'2.8rem', fontSize:'1rem'}} variant="outlined" color="error" size="medium" sx={{marginRight:3}} onClick={() => router.push(paths.mypage.worksDetail(parseInt(workId, 10)))}>
            취소하기
          </Button>

          <LoadingButton
              type="submit"
              style={{height:'2.8rem', fontSize:'1rem'}} variant="outlined" color="success" size="medium"
              loading={isSubmitting}
          >
            수정하기
          </LoadingButton>
        </Stack>
      </Stack>
    </Grid>
  );



  return (
    <>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          {renderDetails}
        </Grid>
      </FormProvider>
      {/* {blocker.state === 'blocked' && (
        <Grid>
          <Button onClick={() => blocker.proceed()}>과연</Button>
          <Button onClick={() => blocker.reset()}>되랏</Button>
        </Grid>
      )} */}
        {/* <WorksFormEscape
        open={showPrompt}
        onClose={() => cancelNavigation}
        onOpen={() => showPrompt}
        onMove={confirmNavigation}
        selectVariant='zoomIn'
      /> */}
    </>
  );
}
