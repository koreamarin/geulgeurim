import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import TextMaxLine from 'src/components/text-max-line';

import { BoardMainItem } from 'src/types/blog';

type propsType = {
  newBoard: BoardMainItem[];
  popBoard: BoardMainItem[];
};

export default function BoardMainView(props: propsType) {
  const { newBoard, popBoard } = props;

  // console.log("api test: ", newBoard);
  // console.log("api test: ", popBoard);

  const board = paths.community.board.main;
  const boardDetail = paths.community.board.detail;

  return (
    <Container sx={{ marginBottom: 5 }}>
      <Box width={800} alignItems="center" sx={{ border: '2px solid lightgrey' }}>
        <Box paddingLeft={3}>
          <Link
            component={RouterLink}
            href={board}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <h2>자유 게시판</h2>
          </Link>
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
                  {popBoard?.length === 0 ? (
                    <>아직 작성한 글이 없습니다.</>
                  ) : (
                    popBoard?.map((popular, idx) => (
                      <Link
                        color="inherit"
                        style={{ textDecoration: 'none' }}
                        component={RouterLink}
                        href={boardDetail(popular.boardId)}
                      >
                        <li style={{ marginBottom: idx === 4 ? 0 : 3 }}>
                          <TextMaxLine line={1} variant="subtitle2" persistent>
                            {popular.title}
                          </TextMaxLine>
                        </li>
                      </Link>
                    ))
                  )}
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
                    {newBoard?.length === 0 ? (
                      <>아직 작성한 글이 없습니다.</>
                    ) : (
                      newBoard?.map((popular, idx) => (
                        <Link
                          color="inherit"
                          style={{ textDecoration: 'none' }}
                          component={RouterLink}
                          href={boardDetail(popular.boardId)}
                        >
                          <li style={{ marginBottom: idx === 4 ? 0 : 3 }}>
                            <TextMaxLine line={1} variant="subtitle2" persistent>
                              {popular.title}
                            </TextMaxLine>
                          </li>
                        </Link>
                      ))
                    )}
                  </ul>
                </Box>
                <Box textAlign="right" mr={1} fontSize={10}>
                  <Link
                    component={RouterLink}
                    href={board}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
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
