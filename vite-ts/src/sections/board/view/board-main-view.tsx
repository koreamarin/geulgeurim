import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import TextMaxLine from 'src/components/text-max-line';

// prettier-ignore
function createDummyData(
  boardId: number, userId: number, userNickname: string, title: string, views:number, comment_count:number, created_at: Date, updated_at: Date ) {
  const createdAt = created_at.toLocaleDateString();
  const updatedAt = updated_at.toLocaleDateString();
  const hit = views.toString();
  const commentCnt = comment_count.toString();

  return { boardId, userId, userNickname, title, hit, commentCnt, createdAt, updatedAt};
}
// prettier-ignore
const dummyPop = [
  createDummyData(1, 1, '김싸피', '제 그림 어때요? 이런 그림 어때요? 저런 그림 어때요? 안녕하세요', 10, 5, new Date('2024-05-03'), new Date('2024-05-04')),
  
  createDummyData(3, 2, '이싸피', '펜터치 조절이 어렵네요', 5, 2, new Date('2024-05-03'), new Date('2024-05-04')),
  
  createDummyData(4, 3, '박싸피', '쁘띠 그림체입니다.', 1, 0, new Date('2024-05-03'), new Date('2024-05-04')),
  
  createDummyData(6, 4, '최싸피', '나보다 잘 그리는 사람?', 200, 10, new Date('2024-05-03'), new Date('2024-05-04')),
  
  createDummyData(21, 5, '정싸피', '침착맨 그림체 따라하기' , 13, 2, new Date('2024-05-03'), new Date('2024-05-04')),
]
// prettier-ignore
const dummyNew = [
  createDummyData(30, 6, '조싸피', '이런 독창적인 그림체 어떤가요?', 5, 0, new Date('2024-05-03'), new Date('2024-05-04')),
  
  createDummyData(41, 7, '유싸피', '안녕하세요? 그림 평가 해주세요', 0, 0, new Date('2024-05-03'), new Date('2024-05-04')),
  
  createDummyData(50, 8, '선우싸피', '데뷔할 수 있을까요?', 1, 0, new Date('2024-05-03'), new Date('2024-05-04')),
  
  createDummyData(76, 9, '남궁싸피', '간만에 수채화 그렸는데 어떤가요?', 1, 0, new Date('2024-05-03'), new Date('2024-05-04')),
  
  createDummyData(101, 10, '배싸피', '제 동생 그림입니다.', 503, 15, new Date('2024-05-03'), new Date('2024-05-04')),
];

export default function BoardMainView() {
  const board = paths.community.board.main;
  const boardDetail = paths.community.board.detail;
  return (
    <Container sx={{ marginBottom: 5 }}>
      <Box width={800} alignItems="center" sx={{ border: '2px solid lightgrey' }}>
        <Box paddingLeft={3}>
          <h2>자유 게시판</h2>
        </Box>

        <Box display="flex" sx={{ borderTop: '1px solid lightgrey' }}>
          <Box display="flex" paddingLeft={5} sx={{ width: '100%' }}>
            <Box display="flex" width="50%" sx={{ flexDirection: 'column' }}>
              <Box display="flex" alignItems="center" marginBottom={-3}>
                <img src="src/assets/icons/popular.png" alt="" />
                <h3 style={{ marginLeft: 5 }}>인기글</h3>
              </Box>
              <Box paddingLeft={3}>
                <ul style={{ paddingLeft: 0 }}>
                  {dummyPop.map((popular, idx) => (
                    <Link
                      color="inherit"
                      style={{ textDecoration: 'none' }}
                      component={RouterLink}
                      href={boardDetail(popular.boardId)}
                    >
                      <li style={{marginBottom: idx===4 ? 0 :3}}>
                        <TextMaxLine line={1} variant='subtitle2' persistent>{popular.title}</TextMaxLine>
                      </li>
                    </Link>
                  ))}
                </ul>
              </Box>
              <Box textAlign="right" mr={1} fontSize={10}>
                <Link
                  component={RouterLink}
                  href={board}
                  sx={{ textDecoration: 'none', color: 'black' }}
                >
                  더보기 &gt;
                </Link>
              </Box>
            </Box>
            <Box
              display="flex"
              paddingLeft={5}
              alignItems="center"
              sx={{ borderLeft: '1px solid lightgrey', width: '50%' }}
            >
              <Box display="flex" width="100%" sx={{ flexDirection: 'column' }}>
                <Box display="flex" alignItems="center" marginBottom={-3}>
                  <img src="src/assets/icons/new.png" alt="" />
                  <h3 style={{ marginLeft: 5 }}>최신글</h3>
                </Box>
                <Box paddingLeft={3}>
                  <ul style={{ paddingLeft: '0' }}>
                  {dummyNew.map((popular, idx) => (
                    <Link
                      color="inherit"
                      style={{ textDecoration: 'none' }}
                      component={RouterLink}
                      href={boardDetail(popular.boardId)}
                    >
                      <li style={{marginBottom: idx===4 ? 0 :3}}>
                        <TextMaxLine line={1} variant='subtitle2' persistent>{popular.title}</TextMaxLine>
                      </li>
                    </Link>
                  ))}
                  </ul>
                </Box>
                <Box textAlign="right" mr={1} fontSize={10}>
                  <Link component={RouterLink} href={board} style={{ textDecoration: 'none', color: 'black' }}>
                    더보기 &gt;
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
