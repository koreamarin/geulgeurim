import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import CrewItem from 'src/sections/blog/crew-item';

import { CrewMainItem } from 'src/types/blog';

type propType = {
  newCrew: CrewMainItem[];
};

export default function CrewMainView(props: propType) {
  const { newCrew } = props;

  const crew = paths.community.crew.main;
  const navigate = useNavigate();

  const moveToCrewMain = () => {
    navigate(crew);
  };

  return (
    <Container sx={{ marginBottom: 5 }}>
      <Box width={800} alignItems="center" sx={{ border: '2px solid lightgrey' }}>
        <Box paddingLeft={3}>
          <Link
            component={RouterLink}
            href={crew}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <h2>크루 모집 게시판</h2>
          </Link>
        </Box>
        <Box paddingLeft={3} paddingRight={3}>
          {newCrew?.length === 0 ? (
            <table style={{ width: '100%', textAlign: 'center', borderSpacing: '10px 10px' }}>
              <tr>
                <td style={{ width: '100%' }}>아직 작성한 글이 없습니다.</td>
              </tr>
            </table>
          ) : (
            <table style={{ width: '100%', textAlign: 'center', borderSpacing: '10px 10px' }}>
              {Array.from({ length: Math.ceil(newCrew.length / 3) }, (_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: 3 }, (__, colIndex) => {
                    const shareIndex = rowIndex * 3 + colIndex;
                    return (
                      <td key={colIndex} style={{ width: '33.33%' }}>
                        {shareIndex < newCrew.length ? (
                          <CrewItem crew={newCrew[shareIndex]} />
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
          <Button variant="outlined" onClick={moveToCrewMain}>
            더보기
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
