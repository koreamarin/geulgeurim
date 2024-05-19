import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import ShareItem from 'src/sections/blog/share-item';

import { ShareMainItem } from 'src/types/blog';

type propType = {
  newShare: ShareMainItem[];
};

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
          <Link
            component={RouterLink}
            href={share}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <h2>그림 평가 게시판</h2>
          </Link>
        </Box>
        <Box paddingLeft={3} paddingRight={3} marginBottom={0}>
          {newShare?.length === 0 ? (
            <table style={{ width: '100%', textAlign: 'center', borderSpacing: '10px 10px' }}>
              <tr>
                <td style={{ width: '100%' }}>아직 작성한 글이 없습니다.</td>
              </tr>
            </table>
          ) : (
            <table style={{ width: '100%', textAlign: 'center', borderSpacing: '10px 10px' }}>
              {Array.from({ length: Math.ceil(newShare.length / 3) }, (_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: 3 }, (__, colIndex) => {
                    const shareIndex = rowIndex * 3 + colIndex;
                    return (
                      <td key={colIndex} style={{ width: '33.33%' }}>
                        {shareIndex < newShare.length ? (
                          <ShareItem share={newShare[shareIndex]} />
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </table>
          )}
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
