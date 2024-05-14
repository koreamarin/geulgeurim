import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import CrewItem from 'src/sections/blog/crew-item';

// prettier-ignore
function createDummyData(
  crewId: number, userId: number, userNickname: string, userProfile: string, thumbnail: string, title: string, upload: Date, views: number, comments: number,
  pen: number, color: number, bg: number, pd: number, story: number, conti: number, stat: string) {
  const date = upload.toLocaleDateString();
  const hit = views.toString();
  const commentCnt = comments.toString();
  const status = stat === "INPROGRESS" ? 1 : 0;


  return { crewId, userId, userNickname, userProfile, thumbnail, title, date, hit, commentCnt, pen, color, bg, pd, story, conti, status };
}
// prettier-ignore
const dummy = [
  createDummyData(1, 1, '김싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '프로젝트 같이하실 분 모집합니다.',
    new Date('2024-05-03'), 10, 5, 2, 1, 1, 1, 1, 1, 'INPROGRESS'),
    
  createDummyData(3, 2, '이싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '판타지풍 회귀물 관심있으신 분',
    new Date('2024-05-03'), 3, 1, 0, 1, 1, 0, 1, 0, 'INPROGRESS'),
  
  createDummyData(4, 3, '박싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '작은 프로젝트 같이 하실 분',
    new Date('2024-05-03'), 1, 0, 1, 0, 0, 1, 1, 1, 'INPROGRESS'),
  
  createDummyData(6, 4, '최싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '기획부터 시작하실 분 모집!',
    new Date('2024-05-03'), 200, 10, 2, 1, 1, 0, 0, 0, 'INPROGRESS'),
  
  createDummyData(21, 5, '정싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '기가막힌 아이디어가 있는데 ',
    new Date('2024-05-03'), 13, 2, 0, 1, 0, 1, 0, 0, 'CLOSED'),
  
  createDummyData(30, 6, '조싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '옴니버스 개그만화 해보실 분',
    new Date('2024-05-03'), 5, 0, 0, 0, 1, 0, 1, 0, 'INPROGRESS'),
  
  createDummyData(41, 7, '유싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '채색, 배경 한 분씩 구합니다.',
    new Date('2024-05-03'), 0, 0, 1, 1, 0, 0, 0, 0, 'INPROGRESS'),
  
  createDummyData(50, 8, '선우싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '사람살려 여기 사람있어요',
    new Date('2024-05-03'), 1, 0, 0, 1, 1, 1, 1, 0, 'CLOSED'),
  
  createDummyData(76, 9, '남궁싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '차 뒤에 기둥있어요',
    new Date('2024-05-03'), 1, 0, 0, 1, 1, 0, 1, 0, 'CLOSED'),
  
  createDummyData(101, 10, '배싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '네이버 드가자~',
    new Date('2024-05-03'), 503, 15, 0, 1, 1, 0, 0, 0, 'INPROGRESS'),
  
  createDummyData(109, 11, '류싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '포폴용 웹툰 만드실 분',
    new Date('2024-05-03'), 20, 2, 0, 1, 1, 0, 0, 0, 'INPROGRESS'),
  
  createDummyData(109, 12, '윤싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '10~12화 완결 프로젝트 같이 하실 분',
    new Date('2024-05-03'), 20, 2, 0, 0, 0, 1, 1, 0, 'INPROGRESS'),
  
  createDummyData(109, 13, '지싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', '5화짜리 프로젝트 ㄱㄱ?',
    new Date('2024-05-03'), 20, 2, 1, 1, 0, 0, 0, 1, 'INPROGRESS'),
];

export default function CrewMainView() {
  const crew = paths.community.crew.main;
  const navigate = useNavigate();

  const moveToCrewMain = () => {
    navigate(crew);
  };

  return (
    <Container sx={{ marginBottom: 5 }}>
      <Box width={800} alignItems="center" sx={{ border: '2px solid lightgrey' }}>
        <Box paddingLeft={3}>
          <h2>크루 모집 게시판</h2>
        </Box>
        <Box paddingLeft={3} paddingRight={3}>
          <table style={{ width: '100%', textAlign: 'center', borderSpacing: '10px 10px' }}>
            <tr>
              <td style={{ width: '33.33%', height:0 }}>
              <div style={{height: '100%', width: '100%', display: 'grid'}}>
                <CrewItem crew={dummy[0]} />
                </div>
              </td>
              <td style={{ width: '33.33%', height:0 }}>
              <div style={{height: '100%', width: '100%', display: 'grid'}}>
                <CrewItem crew={dummy[1]} />
                </div>
              </td>
              <td style={{ width: '33.33%', height:0 }}>
              <div style={{height: '100%', width: '100%', display: 'grid'}}>
                <CrewItem crew={dummy[2]} />
                </div>
              </td>
            </tr>
            <tr>
            <td style={{ width: '33.33%', height:0 }}>
              <div style={{height: '100%', width: '100%', display: 'grid'}}>
                <CrewItem crew={dummy[3]} />
                </div>
              </td>
              <td style={{ width: '33.33%', height:0 }}>
              <div style={{height: '100%', width: '100%', display: 'grid'}}>
                <CrewItem crew={dummy[4]} />
                </div>
              </td>
              <td style={{ width: '33.33%', height:0 }}>
              <div style={{height: '100%', width: '100%', display: 'grid'}}>
                <CrewItem crew={dummy[5]} />
                </div>
              </td>
            </tr>
          </table>
        </Box>
        <Box style={{ width: '100%', textAlign: 'center', marginBottom: 10 }}>
          <Button variant="outlined" onClick={moveToCrewMain}>
            더보기
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
