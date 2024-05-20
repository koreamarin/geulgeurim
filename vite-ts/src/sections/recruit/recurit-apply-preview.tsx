import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useGetUserDetail } from 'src/api/user';
import { useGetPortfolios } from 'src/api/portfolio';
import { useGetResumeDetail } from 'src/api/mypageResume';

import { useSnackbar } from 'src/components/snackbar';
import { SplashScreen } from 'src/components/loading-screen';

import ResumeFormPortfolioUserPreview from './resume-form-portfolio-user-preview';
import ResumeFormPortfolioServicePreview from './resume-form-portfolio-service-preview';

const positionList = [
  {value:'1', label:'선화'},
  {value:'2', label:'밑색'},
  {value:'3', label:'명암'},
  {value:'4', label:'후보정'},
  {value:'5', label:'작화'},
  {value:'6', label:'어시'},
  {value:'7', label:'각색'},
  {value:'8', label:'콘티'},
  {value:'9', label:'표지'},
  {value:'10', label:'삽화'},
  {value:'11', label:'배경'},
  {value:'12', label:'채색'},
  {value:'13', label:'편집'},
  {value:'14', label:'작가'},
];

const userDummy = {
  name : "배상훈",
  birthday : new Date('1996-08-06'),
  email : "test@test.com",
  phone_num : "010-1234-5678",
  thumbnail: "",
}

type Props = {
  resumeId: string
}

export default function RecruitApplyPreview({resumeId}: Props) {
  const { resumesDetailData, resumesDetailError, resumesDetailLoading } = useGetResumeDetail(parseInt(resumeId, 10));
  const { portfoliosData, portfoliosError, portfoliosLoading } = useGetPortfolios();
  const { userDetailData, userDetailLoading, userDetailError} = useGetUserDetail()

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  if (resumesDetailError || portfoliosError || userDetailError) {
    enqueueSnackbar('에러 발생! 다시 로그인해주세요');
    localStorage.clear();
    router.push(paths.recruit.main);
  }

  const renderResumeDetail = () => {
    if (resumesDetailLoading || portfoliosLoading || userDetailLoading) {
      return <SplashScreen />;
    }
    if (resumesDetailData && portfoliosData) {
      return (
        <Grid container spacing={3}>
          <Grid xsOffset={1} mdOffset={2} xs={10} md={8}>
            <Typography variant="h3" sx={{display:'flex',  justifyContent: 'space-between', mb: 3}}>
              {resumesDetailData.resumeTitle}
            </Typography>

            {/* 기본정보 */}
            <Card sx={{ p: 3 }}>
              <CardHeader sx={{ mb: 1, pt: 0 }} titleTypographyProps={{ variant: 'h4' }} title="기본정보" />
              <Grid container spacing={2} mt={2}>
                <Grid  xsOffset={3} mdOffset={0} xs={6} md={4} xl={3}>
                  <CardMedia
                    component="img"
                    crossOrigin='anonymous'
                    image={resumesDetailData?.fileUrl || `/default_person.png`}
                    alt="증명사진"
                    sx={{
                      display: 'block',
                      margin: 'auto',
                      border: '1px solid #80808036',
                      p: 1
                    }}
                  />
                </Grid>

                <Grid xsOffset={1} mdOffset={0} xs={10} md={8} xl={9} pb={3} sx={{
                    minHeight: '280px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                  {[
                    { label: "이름", value:userDetailData.name  },
                    { label: "이메일", value: userDetailData.email },
                    { label: "연락처", value: userDetailData.phoneNum },
                    { label: "생년월일", value: userDetailData.birthday },
                    { label: "직군", value: resumesDetailData?.resumePositionResponses.map(item => positionList.find(positionItem => positionItem.value === item.positionId.toString())?.label).join(', ') }
                  ].map((info, index) => (
                    <Stack key={index} direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2}}>
                      <Typography variant="subtitle1" color="gray" sx={{minWidth: '170px' }}>
                        {info.label}
                      </Typography>
                      <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        {info.value}
                      </Typography>
                    </Stack>
                  ))}
                </Grid>
              </Grid>
            </Card>

            {/* 자기소개서 */}
            <Card sx={{ p: 3, my:3 }}>
              <CardHeader sx={{ mb: 2, pt: 0 }} titleTypographyProps={{variant:'h4' }} title="자기소개서"/>
              <Grid container spacing={2} mt={2}>
                <Grid xs={12} mt={1} px={3} py={1}>
                  <Typography paragraph whiteSpace="pre-wrap" sx={{ lineHeight: '2' }}>
                    {resumesDetailData?.essay}
                  </Typography>
                </Grid>
              </Grid>
            </Card>

            {/* 학력사항 */}
            <Card sx={{ p: 3, my: 3 }}>
              <CardHeader sx={{ mb: 1, pt: 0 }} titleTypographyProps={{ variant: 'h4' }} title="학력정보" />
              {resumesDetailData?.educationResponses.map((item, index) => (
                <Grid container spacing={2} mt={2} key={index} sx={{ borderBottom: 1, borderColor: 'divider', pb: 2, mb: 2 }}>
                  <Grid xs={12} mt={1} px={3} py={1}>
                    <Stack direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2 }}>
                      <Typography variant="subtitle1" color="gray" sx={{minWidth: '170px' }}>
                        학교 이름
                      </Typography>
                      <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        {item.institutionName}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid xs={12} md={6} mt={1} px={3} py={1}>
                    <Stack direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2 }}>
                      <Typography variant="subtitle1" color="gray" sx={{minWidth: '170px' }}>
                        시작일
                      </Typography>
                      <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        {item.startDate?.slice(0, 10)}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid xs={12} md={6} mt={1} px={3} py={1}>
                    <Stack direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2}}>
                      <Typography variant="subtitle1" color="gray" sx={{minWidth: '170px' }}>
                        종료일
                      </Typography>
                      <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        {item.endDate?.slice(0, 10)}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid xs={12} md={6} mt={1} px={3} py={1}>
                    <Stack direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2 }}>
                      <Typography variant="subtitle1" color="gray" sx={{minWidth: '170px' }}>
                        교육상태
                      </Typography>
                      <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        {item.educationStatus === 'ONGOING' ? '졸업 이전' : '졸업 전'}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid xs={12} md={6} mt={1} px={3} py={1}>
                    <Stack direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2 }}>
                      <Typography variant="subtitle1" color="gray" sx={{minWidth: '170px' }}>
                        학점
                      </Typography>
                      <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        {item?.gpa}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              ))}
            </Card>

            {/* 경력사항 */}
            <Card sx={{ p: 3, my: 3 }}>
              <CardHeader sx={{ mb: 1, pt: 0 }} titleTypographyProps={{ variant: 'h4' }} title="경력 정보" />
              {resumesDetailData?.workResponses.map((item, index) => (
                <Grid container spacing={2} mt={2} key={index} sx={{ borderBottom: 1, borderColor: 'divider', pb: 2, mb: 2 }}>
                  <Grid xs={12} mt={1} px={3} py={1}>
                    <Stack direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2 }}>
                      <Typography variant="subtitle1" color="gray" sx={{minWidth: '170px' }}>
                        회사명
                      </Typography>
                      <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        {item.companyName}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid xs={12} md={6} mt={1} px={3} py={1}>
                    <Stack direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2 }}>
                      <Typography variant="subtitle1" color="gray" sx={{minWidth: '170px' }}>
                        시작일
                      </Typography>
                      <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        {item.startDate?.slice(0, 10)}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid xs={12} md={6} mt={1} px={3} py={1}>
                    <Stack direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2}}>
                      <Typography variant="subtitle1" color="gray" sx={{minWidth: '170px' }}>
                        종료일
                      </Typography>
                      <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        {item.endDate?.slice(0, 10)}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid xs={12} mt={1} px={3} py={1}>
                    <Stack direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2 }}>
                      <Typography variant="subtitle1" color="gray" sx={{ minWidth: '170px' }}>
                        경력 설명
                      </Typography>
                      <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        {item.content}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              ))}
            </Card>

            {/* 자격/어학/수상 */}
            <Card sx={{ p: 3, my: 3 }}>
              <CardHeader sx={{ mb: 1, pt: 0 }} titleTypographyProps={{ variant: 'h4' }} title="자격/어학/수상명" />
              {resumesDetailData?.awardResponses.map((item, index) => (
                <Grid container spacing={2} mt={2} key={index} sx={{ borderBottom: 1, borderColor: 'divider', pb: 2, mb: 2 }}>
                  <Grid xs={12} mt={1} px={3} py={1}>
                    <Stack direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2 }}>
                      <Typography variant="subtitle1" color="gray" sx={{ minWidth: '170px' }}>
                      자격/어학/수상명
                      </Typography>
                      <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        {item.awardName}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid xs={12} md={6} mt={1} px={3} py={1}>
                    <Stack direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2 }}>
                      <Typography variant="subtitle1" color="gray" sx={{minWidth: '170px' }}>
                        취득일
                      </Typography>
                      <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        {item.acquisitionDate?.slice(0, 10)}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid xs={12} md={6} mt={1} px={3} py={1}>
                    <Stack direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2}}>
                      <Typography variant="subtitle1" color="gray" sx={{minWidth: '170px' }}>
                        등급/점수
                      </Typography>
                      <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                      {item.score}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid xs={12} mt={1} px={3} py={1}>
                    <Stack direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2 }}>
                      <Typography variant="subtitle1" color="gray" sx={{ minWidth: '170px' }}>
                        발급 기관
                      </Typography>
                      <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        {item.institution}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              ))}
            </Card>

            {/* 경험/활동/교육 */}
            <Card sx={{ p: 3, my: 3 }}>
              <CardHeader sx={{ mb: 1, pt: 0 }} titleTypographyProps={{ variant: 'h4' }} title="경험/활동/교육명" />
              {resumesDetailData?.experienceResponses.map((item, index) => (
                <Grid container spacing={2} mt={2} key={index} sx={{ borderBottom: 1, borderColor: 'divider', pb: 2, mb: 2 }}>
                  <Grid xs={12} mt={1} px={3} py={1}>
                    <Stack direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2 }}>
                      <Typography variant="subtitle1" color="gray" sx={{minWidth: '170px' }}>
                        경험/활동/교육명
                      </Typography>
                      <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        {item.experienceTitle}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid xs={12} md={6} mt={1} px={3} py={1}>
                    <Stack direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2 }}>
                      <Typography variant="subtitle1" color="gray" sx={{minWidth: '170px' }}>
                        시작일
                      </Typography>
                      <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        {item.startDate?.slice(0, 10)}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid xs={12} md={6} mt={1} px={3} py={1}>
                    <Stack direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2}}>
                      <Typography variant="subtitle1" color="gray" sx={{minWidth: '170px' }}>
                        종료일
                      </Typography>
                      <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        {item.endDate?.slice(0, 10)}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid xs={12} mt={1} px={3} py={1}>
                    <Stack direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2 }}>
                      <Typography variant="subtitle1" color="gray" sx={{ minWidth: '170px' }}>
                        경험/활동/교육 설명
                      </Typography>
                      <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        {item.experienceContent}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              ))}
            </Card>

            {/* 선택 포트폴리오 */}
            <Card sx={{ p: 3, my:3 }}>
              <CardHeader sx={{ mb: 1, pt: 0 }} titleTypographyProps={{variant:'h4' }} title="포트폴리오"/>
                {resumesDetailData?.resumePortfolioResponses.map((item, index) => {
                  const data = portfoliosData.find(portfol => portfol.pofolId === item.pofolId);
                  return (
                        <Box key={index} sx={{borderBottom: 'solid #00000014 1px'}}>
                            {data?.format === 'USER' ?
                            <ResumeFormPortfolioUserPreview portfolId={item.pofolId}/>
                            :
                            <ResumeFormPortfolioServicePreview portfolId={item.pofolId}/>
                            }
                        </Box>
                    )})}
            </Card>
          </Grid>
        </Grid>
      )}
      return <Typography sx={{ textAlign: 'center', mt: 4 }}>잘못된 접근입니다.</Typography>;
    };

  return renderResumeDetail();
}
