import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import ShareItem from 'src/sections/blog/share-item';

import { ShareMainItem } from 'src/types/blog';

// prettier-ignore
function createDummyData(
  shareId: number, userId: number, userNickname: string, userProfile: string, fileId: number, thumbnail: string, fileType: string, title: string, created_at: Date, updated_at: Date, views:number, comment_count:number ) {
  const createdAt = created_at.toLocaleDateString();
  const updatedAt = updated_at.toLocaleDateString();
  const hit = views.toString();
  const commentCnt = comment_count.toString();
  const imageList = [{
    'shareImageId': fileId,
    'fileUrl': thumbnail,
    'imageType': fileType,
  },]

  return { shareId, userId, userNickname, userProfile, imageList, title, hit, commentCnt, createdAt, updatedAt};
}
// prettier-ignore
const dummy = [
  createDummyData(1, 1, '김싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
    1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', 'URL', '제 그림 어때요?',
    new Date('2024-05-03'), new Date('2024-05-04'), 10, 5),
  
  createDummyData(3, 2, '이싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
  1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', 'URL', '펜터치 조절이 어렵네요',
    new Date('2024-05-03'), new Date('2024-05-04'), 3, 1),
  
  createDummyData(4, 3, '박싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
  1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', 'URL',
    '쁘띠 그림체입니다.', new Date('2024-05-03'), new Date('2024-05-04'), 1, 0),
  
  createDummyData(6, 4, '최싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
  1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', 'URL',
    '나보다 잘 그리는 사람?', new Date('2024-05-03'), new Date('2024-05-04'), 200, 10),
  
  createDummyData(21, 5, '정싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
  1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', 'URL',
    '침착맨 그림체 따라하기', new Date('2024-05-03'), new Date('2024-05-04'), 13, 2),
  
  createDummyData(30, 6, '조싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
  1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', 'URL',
    '이런 독창적인 그림체 어떤가요?', new Date('2024-05-03'), new Date('2024-05-04'), 5, 0),
  
  createDummyData(41, 7, '유싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
  1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', 'URL',
    '안녕하세요? 그림 평가 해주세요', new Date('2024-05-03'), new Date('2024-05-04'), 0, 0),
  
  createDummyData(50, 8, '선우싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
  1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', 'URL',
    '데뷔할 수 있을까요?', new Date('2024-05-03'), new Date('2024-05-04'), 1, 0),
  
  createDummyData(76, 9, '남궁싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
  1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', 'URL',
    '간만에 수채화 그렸는데 어떤가요?', new Date('2024-05-03'), new Date('2024-05-04'), 1, 0),
  
  createDummyData(101, 10, '배싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
  1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', 'URL',
    '제 동생 그림입니다.', new Date('2024-05-03'), new Date('2024-05-04'), 503, 15),
  
  createDummyData(109, 11, '류싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
  1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', 'URL',
    '포폴용 웹툰 만드실 분', new Date('2024-05-03'), new Date('2024-05-04'), 20, 2),
  
  createDummyData(109, 12, '윤싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
  1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', 'URL',
    '10~12화 완결 프로젝트 같이 하실 분', new Date('2024-05-03'), new Date('2024-05-04'), 20, 2),
  
  createDummyData(109, 13, '지싸피', 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png',
  1, 'https://geulgrim.s3.ap-northeast-2.amazonaws.com/profile/notion-avatar-1708927389233.png', 'URL',
    '5화짜리 프로젝트 ㄱㄱ?', new Date('2024-05-03'), new Date('2024-05-04'), 20, 2),
];

type propType = {
  newShare: ShareMainItem[];
}

export default function ShareMainView(props: propType) {
  const { newShare } = props;

  const share = paths.community.share.main;
  const navigate = useNavigate();

  const moveToShareMain = () => {
    navigate(share);
  };

  return (
    <Container sx={{ marginBottom: 5 }}>
      <Box width={800} alignItems="center" sx={{ border: '2px solid lightgrey' }}>
        <Box paddingLeft={3}>
          <h2>그림 평가 게시판</h2>
        </Box>
        <Box paddingLeft={3} paddingRight={3} marginBottom={0}>
          {newShare?.length === 6 ? 
          (<table style={{ width: '100%', textAlign: 'center', borderSpacing: '10px 10px' }}>
          <tr>
            <td style={{ width: '33.33%' }}>
              <ShareItem share={newShare[0]} />
            </td>
            <td style={{ width: '33.33%' }}>
              <ShareItem share={newShare[1]} />
            </td>
            <td style={{ width: '33.33%' }}>
              <ShareItem share={newShare[2]} />
            </td>
          </tr>
          <tr>
            <td>
              <ShareItem share={newShare[3]} />
            </td>
            <td>
              <ShareItem share={newShare[4]} />
            </td>
            <td>
              <ShareItem share={newShare[5]} />
            </td>
          </tr>
        </table>) 
          : 
          (<table style={{ width: '100%', textAlign: 'center', borderSpacing: '10px 10px' }}>
          <tr>
            <td style={{ width: '33.33%' }}>
              <ShareItem share={dummy[0]} />
            </td>
            <td style={{ width: '33.33%' }}>
              <ShareItem share={dummy[1]} />
            </td>
            <td style={{ width: '33.33%' }}>
              <ShareItem share={dummy[2]} />
            </td>
          </tr>
          <tr>
            <td>
              <ShareItem share={dummy[3]} />
            </td>
            <td>
              <ShareItem share={dummy[4]} />
            </td>
            <td>
              <ShareItem share={dummy[5]} />
            </td>
          </tr>
        </table>)}
          
        </Box>
        <Box style={{ width: '100%', textAlign: 'center', marginBottom: 10 }}>
          <Button variant="outlined" onClick={moveToShareMain}>
            더보기
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
