import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useEffect, useCallback  } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useGetUserDetail } from 'src/api/user';
import { useGetPortfolios } from 'src/api/portfolio';
import { postResumeList, useGetResumeDetail } from 'src/api/mypageResume';

import { useSnackbar } from 'src/components/snackbar';
import { SplashScreen } from 'src/components/loading-screen';
import FormProvider, {
  RHFTextField,
  RHFMultiSelect
} from 'src/components/hook-form';

import RHFWork from './resume-form-work';
import RHFAward from './resume-form-award';
import { positionList } from '../position';
import ResumeRHFUpload from './resume-form-image';
import ResumeRHFSwitch from './resume-form-switch';
import RHFEducation from './resume-form-education';
import RHFExperience from './resume-form-experience';
import RHFSelectPortfolio from './resume-form-portfolio';

// ----------------------------------------------------------------------


type Props = {
  copyId?: string
};


export default function ResumeForm({ copyId }: Props) {
  // 만약 workId가 있으면(복사하기) api get 요청 후 default에 삽입
  const router = useRouter();
  const { resumesDetailData,  resumesDetailLoading } = useGetResumeDetail(copyId ? parseInt(copyId, 10) : undefined)
  const { portfoliosData, portfoliosLoading } = useGetPortfolios()
  const { userDetailData, userDetailLoading} = useGetUserDetail()

  console.log(userDetailData)

  // defaults
  const defaultValues = useMemo(() => ({
    resumeTitle: resumesDetailData?.resumeTitle || `${ userDetailData?.name || userDetailData?.nickname }님의 이력서`,
    essay: resumesDetailData?.essay || '',
    openStatus: resumesDetailData?.openStatus || 'PRIVATE',
    fileUrl: '',
    positionIds: resumesDetailData?.resumePositionResponses.map(pos => pos.positionId.toString()) || [],
    portfolioIds: resumesDetailData?.resumePortfolioResponses.map(pos => pos.pofolId) || [],
    createEducationRequests: resumesDetailData?.educationResponses.map(edu => ({
      institutionName: edu.institutionName,
      startDate: new Date(edu.startDate),
      endDate: edu.endDate ? new Date(edu.endDate) : new Date(),
      educationStatus: edu.educationStatus || 'ONGOING',
      gpa: edu.gpa
    })) || [],
    createWorkRequests: resumesDetailData?.workResponses.map(work => ({
      companyName: work.companyName || '',
      startDate: work.startDate ? new Date(work.startDate) : new Date(),
      endDate: work.endDate ? new Date(work.endDate)  : new Date(),
      content: work.content || ''
    })) || [],
    createAwardRequests: resumesDetailData?.awardResponses.map(award => ({
      awardName: award.awardName || '',
      acquisitionDate: award.acquisitionDate ? new Date(award.acquisitionDate) : new Date(),
      institution: award.institution,
      score: award.score
    })) || [],
    createExperienceRequests: resumesDetailData?.experienceResponses.map(exp => ({
      experienceTitle: exp.experienceTitle || '',
      experienceContent: exp.experienceContent || '',
      startDate: exp.startDate ? new Date(exp.startDate) : new Date(),
      endDate: exp.endDate ? new Date(exp.endDate) : new Date()
    })) || [],
  }), [resumesDetailData, userDetailData ]);


  const { enqueueSnackbar } = useSnackbar();

  const NewWorksSchema = Yup.object().shape({
    // required
    // 제목
    resumeTitle: Yup.string().required('제목은 필수입니다.'),

    // not required
    // 자기소개서
    essay: Yup.string(),
    // 공개 여부 설정
    openStatus: Yup.string().oneOf(['PRIVATE', 'PUBLIC'], '공개 상태를 선택해주세요'),
    // 증명사진
    fileUrl: Yup.mixed<any>().nullable(),
    // 포지션
    positionIds: Yup.array(),
    // 포트폴리오
    portfolioIds: Yup.array(),
    // 학력사항
    createEducationRequests: Yup.array().of(
      Yup.object().shape({
        // 학교명 - 필수
        institutionName: Yup.string().required('학교 이름은 필수입니다.'),
        // 시작날짜 - 필수
        startDate: Yup.mixed<any>().required('시작 날짜는 필수입니다.'),
        // 종료날짜 - 선택
        endDate: Yup.mixed<any>().nullable().test(
          'date-min',
          '종료날짜는 시작날짜보다 뒤에 있어야합니다',
          (value, {parent}) => {
            const { startDate } = parent;
            return !startDate || !value || new Date(value).getTime() > new Date(startDate).getTime();
        }
        ),
        // 교육상태 - 필수
        educationStatus: Yup.string().required('상태는 필수입니다.').oneOf(['COMPLETED', 'ONGOING'], '교육 상태는 졸업 또는 졸업예정 중 하나여야 합니다.'),
        // GPA - 선택
        gpa: Yup.number().nullable().lessThan(4.5, '4.5 아래로 작성해주세요')
      })
    ),
    // 경력사항
    createWorkRequests: Yup.array().of(
      Yup.object().shape({
        // 회사명 - 필수
        companyName: Yup.string().required('회사명은 필수입니다.'),
        // 시작날짜 - 필수
        startDate: Yup.mixed<any>().required('시작 날짜는 필수입니다.'),
        // 종료날짜 - 필수
        endDate: Yup.mixed<any>().required('종료 날짜는 필수입니다.').test(
          'date-min',
          '종료날짜는 시작날짜보다 뒤에 있어야합니다',
          (value, {parent}) => {
            const { startDate } = parent;
            return !startDate || !value || new Date(value).getTime() > new Date(startDate).getTime();
        }
        ),
        // 경력설명 - 필수
        content: Yup.string().required('설명은 필수입니다.')
      })
    ),
    // 수상...사항
    createAwardRequests: Yup.array().of(
      Yup.object().shape({
        // 수상명 - 필수
        awardName: Yup.string().required('이름은 필수입니다.'),
        // 획득날 - 필수
        acquisitionDate: Yup.mixed<any>().required('날짜는 필수입니다.'),
        // 발급기관 - 선택
        institution: Yup.string(),
        // 등급/점수 - 선택
        score: Yup.string()
      })
    ),
    // 경험... 사항
    createExperienceRequests: Yup.array().of(
      Yup.object().shape({
        // 경험제목 - 필수
        experienceTitle: Yup.string().required('경험 제목은 필수입니다.'),
        // 경험내용 - 필수
        experienceContent: Yup.string().required('경험 내용은 필수입니다.'),
        // 경험시작일 - 필수
        startDate: Yup.mixed<any>().required('시작 날짜는 필수입니다.'),
        // 경험종료일 - 필수
        endDate: Yup.mixed<any>().required('종료 날짜는 필수입니다.')
      })
    ),
  });


  const methods = useForm({
    resolver: yupResolver(NewWorksSchema),
    defaultValues,
    mode: 'onChange'
  });

  const {
    reset,
    setValue,
    handleSubmit,
    // formState: { isSubmitting, isDirty },
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (resumesDetailData && portfoliosData && copyId) {
      reset(defaultValues);
    }
  }, [resumesDetailData, portfoliosData, reset, defaultValues, copyId]);
  // submit 로직
  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();

  // JSON 데이터 추가
    formData.append('createResumeRequest',  new Blob([JSON.stringify({
      resumeTitle: data.resumeTitle,
      essay: data.essay,
      openStatus: data.openStatus,
      positionIds: data.positionIds,
      pofolIds: data.portfolioIds,
      createEducationRequests: data.createEducationRequests?.map(({ institutionName, ...rest }) => ({
        ...rest,
        insitutionName: institutionName,
      })),
      createWorkRequests: data.createWorkRequests?.map(({ companyName, ...rest }) => ({
        ...rest,
        company: companyName,
      })),
      createAwardRequests: data.createAwardRequests,
      createExperienceRequests: data.createExperienceRequests,
    })], {
      type: "application/json"
  })
    );
    if (data.fileUrl) {
      formData.append('image_file', data.fileUrl);
    } else {
      formData.append('image_file', new Blob([]), '');
    }

    formData.append('image_file', data.fileUrl ? data.fileUrl : new Blob([]));
    try {
      console.log(data)
      const result = await postResumeList(formData)
      if (result) {
        reset();
        enqueueSnackbar('이력서 등록 성공!');
        router.push(paths.mypage.resume);
      }
      else {
        enqueueSnackbar('이력서 등록 실패!', { variant: 'error' });
      }
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

  const renderDetails = () => {
    if (resumesDetailLoading || portfoliosLoading || userDetailLoading) {
      return <SplashScreen />;
    }
    if ((resumesDetailData && portfoliosData) || !copyId) {
      return (
      <Grid xsOffset={1} mdOffset={2} xs={10} md={8}>

        <Typography variant="h3" sx={{display:'flex',  justifyContent: 'space-between', mb: 3}}>
            이력서 등록
            <ResumeRHFSwitch name="openStatus" label="공개여부" labelPlacement='start'/>
        </Typography>

        {/* 기본정보 */}
        <Card sx={{ p: 3 }}>
            <CardHeader sx={{ mb: 2, pt: 0 }} title="기본정보"/>
            {/* 제목 */}
            <RHFTextField name="resumeTitle" label="*이력서 제목" />

          <Grid container spacing={2} mt={3} >

            {/* 증명사진 입력 */}
            <Grid xsOffset={3} mdOffset={0} xs={6} md={4} xl={3}>
              <ResumeRHFUpload
                name="fileUrl"
                onDrop={handleDrop}
                onDelete={handleRemoveFile}
              />
            </Grid>

            {/* 유저 정보 */}
            <Grid xsOffset={1} mdOffset={0} xs={10} md={8} xl={9} sx={{
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <TextField
                  disabled
                  fullWidth
                  label="이름"
                  defaultValue={userDetailData.name}
                />
                <TextField
                  disabled
                  fullWidth
                  label="이메일"
                  defaultValue={userDetailData.email}
                />
                <TextField
                  disabled
                  fullWidth
                  label="연락처"
                  defaultValue={userDetailData.phoneNum}
                />

                <TextField
                  disabled
                  fullWidth
                  label="생년월일"
                  defaultValue={userDetailData.birthday}
                />
            </Grid>

            {/* 포지션 선택 */}
            <Grid xs={12} mt={2}>
              <RHFMultiSelect
                  chip
                  checkbox
                  name="positionIds"
                  label="역할"
                  options={positionList}
                  sx={{width:'100%'}}
                />
            </Grid>

            {/* 자기소개서 */}
            <Grid xs={12} mt={2}>
              <RHFTextField name="essay" label="자기소개서" multiline rows={8} />
            </Grid>
          </Grid>
        </Card>

        {/* 학력사항 */}
        <Card sx={{marginY: 4, p:3}}>
          <RHFEducation />
        </Card>

        {/* 경력사항 */}
        <Card sx={{marginY: 4, p:3}}>
          <RHFWork />
        </Card>

        {/* 자격/어학/수상 */}
        <Card sx={{marginY: 4, p:3}}>
          <RHFAward />
        </Card>

        {/* 경험/활동/교육 */}
        <Card sx={{marginY: 4, p:3}}>
          <RHFExperience />
        </Card>

        {/* 포트폴리오 선택 */}
        <Card sx={{marginY: 4, p:3}}>
            <CardHeader sx={{ mb: 2, pt: 0 }} title="포트폴리오" action={
                  <Button  style={{height:'2.8rem', fontSize:'1rem'}} variant="outlined" color="success" size="medium"
                  onClick={() => router.push(paths.mypage.portfolioWrite)}
                  >
                    작성하기
                  </Button>
              }/>
            <RHFSelectPortfolio portfolDatas={portfoliosData}/>
        </Card>


        <Stack mb={4} direction="row" alignItems="center" justifyContent="end">
          <Button
              style={{height:'2.8rem', fontSize:'1rem'}} variant="outlined" color="error" size="medium" onClick={() => router.push(paths.mypage.resume)} sx={{marginRight:3}}>
            취소하기
          </Button>

          <LoadingButton
              type="submit"
              style={{height:'2.8rem', fontSize:'1rem'}} variant="outlined" color="success" size="medium"
              loading={isSubmitting}
          >
            등록하기
          </LoadingButton>
        </Stack>
      </Grid>
    )
  }
  return <Typography sx={{ textAlign: 'center', mt: 4 }}>잘못된 접근입니다.</Typography>;
}



  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          {renderDetails()}
        </Grid>
      </FormProvider>
  );
}
