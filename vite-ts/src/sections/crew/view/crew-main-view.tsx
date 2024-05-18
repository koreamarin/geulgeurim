import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import CrewItem from 'src/sections/blog/crew-item';

import { CrewMainItem } from 'src/types/blog';

type propType = {
  newCrew: CrewMainItem[];
}

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
          <h2>크루 모집 게시판</h2>
        </Box>
        <Box paddingLeft={3} paddingRight={3}>
          { newCrew?.length === 6 ? 
          (<table style={{ width: '100%', textAlign: 'center', borderSpacing: '10px 10px' }}>
          <tr>
            <td style={{ width: '33.33%', height:0 }}>
            <div style={{height: '100%', width: '100%', display: 'grid'}}>
              <CrewItem crew={newCrew[0]} />
              </div>
            </td>
            <td style={{ width: '33.33%', height:0 }}>
            <div style={{height: '100%', width: '100%', display: 'grid'}}>
              <CrewItem crew={newCrew[1]} />
              </div>
            </td>
            <td style={{ width: '33.33%', height:0 }}>
            <div style={{height: '100%', width: '100%', display: 'grid'}}>
              <CrewItem crew={newCrew[2]} />
              </div>
            </td>
          </tr>
          <tr>
          <td style={{ width: '33.33%', height:0 }}>
            <div style={{height: '100%', width: '100%', display: 'grid'}}>
              <CrewItem crew={newCrew[3]} />
              </div>
            </td>
            <td style={{ width: '33.33%', height:0 }}>
            <div style={{height: '100%', width: '100%', display: 'grid'}}>
              <CrewItem crew={newCrew[4]} />
              </div>
            </td>
            <td style={{ width: '33.33%', height:0 }}>
            <div style={{height: '100%', width: '100%', display: 'grid'}}>
              <CrewItem crew={newCrew[5]} />
              </div>
            </td>
          </tr>
        </table>) 
          : 
          <div />}
          
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
