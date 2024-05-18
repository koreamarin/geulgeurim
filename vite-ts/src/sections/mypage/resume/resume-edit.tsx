import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useCallback  } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

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

import { useSnackbar } from 'src/components/snackbar';
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
  id: string
};

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
    createdAt: '2022-04-01',
    updatedAt: '2024-04-01',
    status : 'PUBLIC',
    format : 'USER'
  },
  {
    pofolName : "더미데이터 제목2",
	  pofolId : 2,
    createdAt: '2022-04-02',
    updatedAt: '2024-04-01',
    status : 'PUBLIC',
    format : 'SERVICE'
  },
  {
    pofolName : "더미데이터 제목3",
	  pofolId : 3,
    createdAt: '2022-04-03',
    updatedAt: '2024-04-01',
    status : 'PUBLIC',
    format : 'USER'
  },
  {
    pofolName : "더미데이터 제목4",
	  pofolId : 4,
    createdAt: '2022-04-04',
    updatedAt: '2024-04-01',
    status : 'PUBLIC',
    format : 'SERVICE'
  },
  {
    pofolName : "더미데이터 제목5",
	  pofolId : 5,
    createdAt: '2022-04-05',
    updatedAt: '2024-04-01',
    status : 'PUBLIC',
    format : 'SERVICE'
  },
  {
    pofolName : "더미데이터 제목6",
	  pofolId : 6,
    createdAt: '2022-04-06',
    updatedAt: '2024-04-01',
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


export default function ResumeEdit({ id }: Props) {
  // 만약 workId가 있으면(복사하기) api get 요청 후 default에 삽입
  if (id) {
    console.log('api 요청')

  }

  const router = useRouter();

  // defaults
  const defaultValues = useMemo(
    () => {
      const findResume = dummy.find(resume => resume.resumeId.toString() === id);
      return {
        resumeTitle: findResume?.resumeTitle || `${userDummy.name}님의 이력서`,
        essay: findResume?.essay || '',
        openStatus: findResume?.openStatus || 'PRIVATE',
        fileUrl: findResume?.fileUrl || '',

        positionIds: findResume?.resumePositionResponses.map(pos => pos.positionId.toString()) || [],

        portfolioIds: findResume?.resumePortfolioResponses.map(pos => pos.pofolId) || [],

        createEducationRequests: findResume?.educationResponses.map(edu => ({
          institutionName: edu.institutionName,
          startDate: edu.startDate,
          endDate: edu.endDate,
          educationStatus: edu.educationStatus,
          gpa: edu.gpa
        })) || [],
        createWorkRequests: findResume?.workResponses.map(work => ({
          companyName: work.companyName,
          startDate: work.startDate,
          endDate: work.endDate,
          content: work.content
        })) || [],
        createAwardRequests: findResume?.awardResponses.map(award => ({
          awardName: award.awardName,
          acquisitionDate: award.acquisitionDate,
          institution: award.institution,
          score: award.score
        })) || [],
        createExperienceRequests: findResume?.experienceResponses.map(exp => ({
          experienceTitle: exp.experienceTitle,
          experienceContent: exp.experienceContent,
          startDate: exp.startDate,
          endDate: exp.endDate
        })) || []
      };
    }, [id]
  );

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
        startDate: Yup.date().required('시작 날짜는 필수입니다.'),
        // 경험종료일 - 필수
        endDate: Yup.date().required('종료 날짜는 필수입니다.')
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


  // submit 로직
  const onSubmit = handleSubmit(async (data) => {
    console.log('등록')
    try {
      // api로 바꿔야함
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar('이력서 등록 성공!');
      router.push(paths.mypage.resume);
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

      <Typography variant="h3" sx={{display:'flex',  justifyContent: 'space-between', mb: 3}}>
          이력서 수정
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
                defaultValue={userDummy.name}
              />
              <TextField
                disabled
                fullWidth
                label="이메일"
                defaultValue={userDummy.email}
              />
              <TextField
                disabled
                fullWidth
                label="연락처"
                defaultValue={userDummy.phone_num}
              />

              <TextField
                disabled
                fullWidth
                label="생년월일"
                defaultValue={userDummy.birthday.toLocaleDateString()}
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
          <RHFSelectPortfolio portfolDatas={dummyPortfolio}/>
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
  );



  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          {renderDetails}
        </Grid>
      </FormProvider>
  );
}
