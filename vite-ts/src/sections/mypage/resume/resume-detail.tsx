import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Accordion from '@mui/material/Accordion';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';

import { positionList } from '../position';
import ResumeDetailDelete from './resume-detail-delete';
import ResumeFormPortfolioUserPreview from './resume-form-portfolio-user-preview';
import ResumeFormPortfolioServicePreview from './resume-form-portfolio-service-preview';


const dummy = [
  {
      "resumeId": 41,
      "resumeTitle": "이력서",
      "essay": "저는 월급 루팡입니다.",
      "openStatus": "PRIVATE",
      "fileUrl": "https://k.kakaocdn.net/dn/cD4BaL/btsAaYmkBz8/2YJ6o7gqIk52caVsddDW10/img_110x110.jpg",
      "resumePositionResponses": [
          {
              "resumePositionId": 65,
              "positionId": 1
          },
          {
              "resumePositionId": 66,
              "positionId": 2
          }
      ],
      "resumePortfolioResponses": [
          {
              "resumePofolId": 61,
              "pofolId": 2
          },
          {
              "resumePofolId": 62,
              "pofolId": 4
          }
      ],
      "educationResponses": [
          {
              "educationId": 45,
              "institutionName": "하버드",
              "startDate": new Date("2024-05-09T00:00:00"),
              "endDate": new Date("2024-05-10T00:00:00"),
              "educationStatus": "ONGOING",
              "gpa": 1.00
          },
          {
              "educationId": 46,
              "institutionName": "스텐포드",
              "startDate": new Date("2024-05-08T00:00:00"),
              "endDate": new Date("2024-05-10T00:00:00"),
              "educationStatus": "ONGOING",
              "gpa": 2.00
          }
      ],
      "workResponses": [
          {
              "workId": 43,
              "companyName": "구글",
              "startDate": new Date("2024-05-09T00:00:00"),
              "endDate": new Date("2024-05-10T00:00:00"),
              "content": "집지키는개"
          },
          {
              "workId": 44,
              "companyName": "SpaceX",
              "startDate": new Date("2024-05-10T00:00:00"),
              "endDate": new Date("2024-05-11T00:00:00"),
              "content": "일론의 운전기사"
          }
      ],
      "awardResponses": [
          {
              "awardId": 41,
              "awardName": "카페진상",
              "acquisitionDate": new Date("2024-05-09T00:00:00"),
              "institution": "동네카페",
              "score": "5.0"
          },
          {
              "awardId": 42,
              "awardName": "밥상",
              "acquisitionDate": new Date("2024-05-10T00:00:00"),
              "institution": "우리집 주방",
              "score": "5.0"
          }
      ],
      "experienceResponses": [
          {
              "experienceId": 39,
              "experienceTitle": "경험없다",
              "experienceContent": "경험이 없어요",
              "startDate": new Date("2024-05-09T00:00:00"),
              "endDate": new Date("2024-05-10T00:00:00")
          },
          {
              "experienceId": 40,
              "experienceTitle": "경험있다",
              "experienceContent": "경험이 있어요",
              "startDate": new Date("2024-05-10T00:00:00"),
              "endDate": new Date("2024-05-11T00:00:00")
          }
      ]
  },
  {
      "resumeId": 42,
      "resumeTitle": "이력서",
      "essay": `"잠재력이 있는 산업군에서의 덕업일치"

      잠재력이 큰 시장에서 변화를 주도하는 회사, 즐기며 좋아하는 분야의 회사에서 일하고 싶습니다. 웹툰은 학창시절부터 빠지지 않는 존재였는데, 특히 이말년시리즈같은 개그물을 주로 봤습니다. 야후에서 연재되던 이말년시리즈가 네이버에서 연재되어 좋아하는 만화를 보기 위해 네이버 웹툰을 보기 시작한 뒤부터 지금까지 매일 웹툰을 보고 있습니다. 좋아하기도 하지만, 새로운 컨텐츠가 끊임없이 생기고 여러 기술을 적용할 수 있는 웹툰 시장의 장래성 또한 끌렸습니다. 웹툰은 게임, 영화, 드라마 등 다른 컨텐츠로 파생되기도 하고, VR을 비롯한 다양한 신기술을 적용할 수 있습니다. 그리고 한국뿐만 아니라 해외 시장을 개척할 잠재력 또한 큽니다. 네이버 웹툰은 독자의 편의성을 고려해 오전 12시에 제공되던 웹툰을 오후 11시에 제공하는 등 필요한 서비스를 제공하며, 새로운 컨텐츠를 바탕으로 해외 웹툰 시장을 개척하고 있습니다. 1위의 자리를 유지하고 있지만 끊임없이 개선점을 찾는 네이버 웹툰에 이끌렸으며, 웹툰 시장의 파이를 키우고 싶습니다.`,
      "openStatus": "PUBLIC",
      "fileUrl": "",
      "resumePositionResponses": [
          {
            "resumePositionId": 75,
            "positionId": 1
        },
        {
            "resumePositionId": 76,
            "positionId": 2
        }
      ],
      "resumePortfolioResponses": [
          {
              "resumePofolId": 61,
              "pofolId": 2
          },
          {
              "resumePofolId": 62,
              "pofolId": 4
          }
      ],
      "educationResponses": [
          {
              "educationId": 48,
              "institutionName": "하버드",
              "startDate": new Date("2024-05-09T00:00:00"),
              "endDate": new Date("2024-05-10T00:00:00"),
              "educationStatus": "ONGOING",
              "gpa": 1.00
          },
          {
              "educationId": 49,
              "institutionName": "스텐포드",
              "startDate": new Date("2024-05-08T00:00:00"),
              "endDate": new Date("2024-05-10T00:00:00"),
              "educationStatus": "ONGOING",
              "gpa": 2.00
          }
      ],
      "workResponses": [
          {
              "workId": 45,
              "companyName": "구글",
              "startDate": new Date("2024-05-09T00:00:00"),
              "endDate": new Date("2024-05-10T00:00:00"),
              "content": "집지키는개"
          },
          {
              "workId": 46,
              "companyName": "SpaceX",
              "startDate": new Date("2024-05-10T00:00:00"),
              "endDate": new Date("2024-05-11T00:00:00"),
              "content": "일론의 운전기사"
          }
      ],
      "awardResponses": [
          {
              "awardId": 43,
              "awardName": "카페진상",
              "acquisitionDate": new Date("2024-05-09T00:00:00"),
              "institution": "동네카페",
              "score": "5.0"
          },
          {
              "awardId": 44,
              "awardName": "밥상",
              "acquisitionDate": new Date("2024-05-10T00:00:00"),
              "institution": "우리집 주방",
              "score": "5.0"
          }
      ],
      "experienceResponses": [
          {
              "experienceId": 42,
              "experienceTitle": "경험없다",
              "experienceContent": "경험이 없어요",
              "startDate": new Date("2024-05-09T00:00:00"),
              "endDate": new Date("2024-05-10T00:00:00")
          },
          {
              "experienceId": 43,
              "experienceTitle": "경험있다",
              "experienceContent": "경험이 있어요",
              "startDate": new Date("2024-05-10T00:00:00"),
              "endDate": new Date("2024-05-11T00:00:00")
          }
      ]
  }
]


const dummyPortfolio = [
  {
    pofolName : "더미데이터 제목1",
	  pofolId : 1,
    createAt: '2022-04-01',
    updateAt: '2024-04-01',
    status : 'PUBLIC',
    format : 'USER'
  },
  {
    pofolName : "더미데이터 제목2",
	  pofolId : 2,
    createAt: '2022-04-02',
    updateAt: '2024-04-01',
    status : 'PUBLIC',
    format : 'SERVICE'
  },
  {
    pofolName : "더미데이터 제목3",
	  pofolId : 3,
    createAt: '2022-04-03',
    updateAt: '2024-04-01',
    status : 'PUBLIC',
    format : 'USER'
  },
  {
    pofolName : "더미데이터 제목4",
	  pofolId : 4,
    createAt: '2022-04-04',
    updateAt: '2024-04-01',
    status : 'PUBLIC',
    format : 'SERVICE'
  },
  {
    pofolName : "더미데이터 제목5",
	  pofolId : 5,
    createAt: '2022-04-05',
    updateAt: '2024-04-01',
    status : 'PUBLIC',
    format : 'SERVICE'
  },
  {
    pofolName : "더미데이터 제목6",
	  pofolId : 6,
    createAt: '2022-04-06',
    updateAt: '2024-04-01',
    status : 'PUBLIC',
    format : 'SERVICE'
  }
]


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

export default function ResumeDetail({resumeId}:Props) {
  const dummyData = dummy.find((item) => item.resumeId === parseInt(resumeId, 10))

  const [changePrivate, setChangePrivate] = useState(dummyData?.openStatus === 'PUBLIC')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 우선적으로 변경하고 api를 보내서 사용자 경험 향상
    const newState = event.target.checked ? 'PUBLIC' : 'PRIVATE';
    setChangePrivate(event.target.checked)
    // SWR을 통해초기 캐시 관리
    console.log(newState)
    // 실패 시 로직이 있어야됌 (ex) 실패했습니다 모달이나 메세지)
    // 로딩 시 좌측 로딩원 작게 띄우기
  };

  const view = useBoolean();

  const selectVariant = 'zoomIn';

  const router = useRouter()

  return (
    <Grid container spacing={3}>
      <Grid xsOffset={1} mdOffset={2} xs={10} md={8}>

        <Typography variant="h3" sx={{display:'flex',  justifyContent: 'space-between', mb: 3}}>
          {dummyData?.resumeTitle}
          <FormControlLabel
            checked={changePrivate}
            key='status'
            label='공개여부'
            labelPlacement='start'
            control={<Switch onChange={handleChange}/>}
            onClick={(event) => event.stopPropagation()}
          />
        </Typography>

        {/* 기본정보 */}
        <Card sx={{ p: 3 }}>
          <CardHeader sx={{ mb: 1, pt: 0 }} titleTypographyProps={{ variant: 'h4' }} title="기본정보" />
          <Grid container spacing={2} mt={2}>
            <Grid  xsOffset={3} mdOffset={0} xs={6} md={4} xl={3}>
              <CardMedia
                component="img"
                image={dummyData?.fileUrl ? dummyData.fileUrl : `/default_person.png`}
                alt="증명사진"
                sx={{
                  display: 'block',
                  height: '100%',
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
                { label: "이름", value: userDummy?.name },
                { label: "이메일", value: userDummy?.email },
                { label: "연락처", value: userDummy?.phone_num },
                { label: "생년월일", value: userDummy?.birthday.toLocaleDateString() },
                { label: "직군", value: dummyData?.resumePositionResponses.map(item => positionList.find(positionItem => positionItem.value === item.positionId.toString())?.label).join(', ') }
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
            {/* 자기소개서 */}
            <Grid xs={12} mt={1} px={3} py={1}>
              <Typography paragraph  whiteSpace="pre-wrap" sx={{ lineHeight: '2' }}>
                {dummyData?.essay}
              </Typography>
            </Grid>
          </Grid>
        </Card>

        {/* 학력사항 */}
        <Card sx={{ p: 3, my: 3 }}>
          <CardHeader sx={{ mb: 1, pt: 0 }} titleTypographyProps={{ variant: 'h4' }} title="학력정보" />
          {dummyData?.educationResponses.map((item, index) => (
            <Grid container spacing={2} mt={2} key={index} sx={{ borderBottom: 1, borderColor: 'divider', pb: 2, mb: 2 }}>
              <Grid xs={12} mt={1} px={3} py={1}>
                {/* 학교 이름 */}
                <Stack direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2 }}>
                  <Typography variant="subtitle1" color="gray" sx={{minWidth: '170px' }}>
                    학교 이름
                  </Typography>
                  <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                    {item.institutionName}
                  </Typography>
                </Stack>
              </Grid>

                {/* 시작일과 종료일 */}
              <Grid xs={12} md={6} mt={1} px={3} py={1}>
                <Stack direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2 }}>
                  <Typography variant="subtitle1" color="gray" sx={{minWidth: '170px' }}>
                    시작일
                  </Typography>
                  <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                    {item.startDate.toLocaleDateString()}
                  </Typography>
                </Stack>
              </Grid>
              <Grid xs={12} md={6} mt={1} px={3} py={1}>
                <Stack direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2}}>
                  <Typography variant="subtitle1" color="gray" sx={{minWidth: '170px' }}>
                    종료일
                  </Typography>
                  <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                    {item.endDate.toLocaleDateString()}
                  </Typography>
                </Stack>
              </Grid>

              <Grid xs={12} md={6} mt={1} px={3} py={1}>
                {/* 교육상태와 학점 */}
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
                    {item.gpa.toFixed(2)}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          ))}
        </Card>


        {/* 경력사항 */}
        <Card sx={{ p: 3, my: 3 }}>
          <CardHeader sx={{ mb: 1, pt: 0 }} titleTypographyProps={{ variant: 'h4' }} title="경력 정보" />
          {dummyData?.workResponses.map((item, index) => (
            <Grid container spacing={2} mt={2} key={index} sx={{ borderBottom: 1, borderColor: 'divider', pb: 2, mb: 2 }}>
              <Grid xs={12} mt={1} px={3} py={1}>
                {/* 회사 이름 */}
                <Stack direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2 }}>
                  <Typography variant="subtitle1" color="gray" sx={{minWidth: '170px' }}>
                    회사명
                  </Typography>
                  <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                    {item.companyName}
                  </Typography>
                </Stack>
              </Grid>

                {/* 시작일과 종료일 */}
              <Grid xs={12} md={6} mt={1} px={3} py={1}>
                <Stack direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2 }}>
                  <Typography variant="subtitle1" color="gray" sx={{minWidth: '170px' }}>
                    시작일
                  </Typography>
                  <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                    {item.startDate.toLocaleDateString()}
                  </Typography>
                </Stack>
              </Grid>
              <Grid xs={12} md={6} mt={1} px={3} py={1}>
                <Stack direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2}}>
                  <Typography variant="subtitle1" color="gray" sx={{minWidth: '170px' }}>
                    종료일
                  </Typography>
                  <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                    {item.endDate.toLocaleDateString()}
                  </Typography>
                </Stack>
              </Grid>

              <Grid xs={12} mt={1} px={3} py={1}>
                {/* 교육상태와 학점 */}
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
          {dummyData?.awardResponses.map((item, index) => (
            <Grid container spacing={2} mt={2} key={index} sx={{ borderBottom: 1, borderColor: 'divider', pb: 2, mb: 2 }}>
              <Grid xs={12} mt={1} px={3} py={1}>
                {/* 자격/어학/수상명 */}
                <Stack direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2 }}>
                  <Typography variant="subtitle1" color="gray" sx={{ minWidth: '170px' }}>
                  자격/어학/수상명
                  </Typography>
                  <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                    {item.awardName}
                  </Typography>
                </Stack>
              </Grid>

              {/* 취득일 */}
              <Grid xs={12} md={6} mt={1} px={3} py={1}>
                <Stack direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2 }}>
                  <Typography variant="subtitle1" color="gray" sx={{minWidth: '170px' }}>
                    취득일
                  </Typography>
                  <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                    {item.acquisitionDate.toLocaleDateString()}
                  </Typography>
                </Stack>
              </Grid>
              {/* 등급/점수 */}
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
                {/* 발급 기관 */}
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
          {dummyData?.experienceResponses.map((item, index) => (
            <Grid container spacing={2} mt={2} key={index} sx={{ borderBottom: 1, borderColor: 'divider', pb: 2, mb: 2 }}>
              <Grid xs={12} mt={1} px={3} py={1}>
                {/* 경험 명 */}
                <Stack direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2 }}>
                  <Typography variant="subtitle1" color="gray" sx={{minWidth: '170px' }}>
                    경험/활동/교육명
                  </Typography>
                  <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                    {item.experienceTitle}
                  </Typography>
                </Stack>
              </Grid>

                {/* 시작일과 종료일 */}
              <Grid xs={12} md={6} mt={1} px={3} py={1}>
                <Stack direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2 }}>
                  <Typography variant="subtitle1" color="gray" sx={{minWidth: '170px' }}>
                    시작일
                  </Typography>
                  <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                    {item.startDate.toLocaleDateString()}
                  </Typography>
                </Stack>
              </Grid>
              <Grid xs={12} md={6} mt={1} px={3} py={1}>
                <Stack direction='row' justifyContent="center" sx={{ borderBottom: '1px solid #80808036', pb: 2}}>
                  <Typography variant="subtitle1" color="gray" sx={{minWidth: '170px' }}>
                    종료일
                  </Typography>
                  <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'left' }}>
                    {item.endDate.toLocaleDateString()}
                  </Typography>
                </Stack>
              </Grid>

              <Grid xs={12} mt={1} px={3} py={1}>
                {/* 경험 설명 */}
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
            {dummyData?.resumePortfolioResponses.map((item, index) => {
              const data = dummyPortfolio.find(portfol => portfol.pofolId === item.pofolId);
              return (
                <Accordion key={index} sx={{borderBottom: 'solid #00000014 1px'}}>
                  <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                    <Typography variant="subtitle2" alignContent='center' ml={2}>{data?.pofolName}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {data?.format === 'USER' ?
                      <ResumeFormPortfolioUserPreview portfolId={item.pofolId}/>
                      :
                      <ResumeFormPortfolioServicePreview portfolId={item.pofolId}/>
                      }
                  </AccordionDetails>
                </Accordion>
            )})}
        </Card>
        <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
          <Button
            style={{ height: '2.8rem', fontSize: '1rem' }}
            variant="outlined"
            color="info"
            size="medium"
            onClick={() => router.push(paths.mypage.resumeCopy(parseInt(resumeId, 10)))}
          >
            복사하기
          </Button>

          <Box>
            <Button
              style={{ height: '2.8rem', fontSize: '1rem', marginRight: '24px' }}
              variant="outlined"
              color="success"
              size="medium"
              onClick={() => router.push(paths.mypage.resumeEdit(parseInt(resumeId, 10)))}
            >
              수정하기
            </Button>

            <ResumeDetailDelete
              open={view.value}
              onOpen={view.onTrue}
              onClose={view.onFalse}
              selectVariant={selectVariant}
              deleteResume={resumeId}
            />
          </Box>
        </Stack>
      </Grid>
    </Grid>
  )
}
