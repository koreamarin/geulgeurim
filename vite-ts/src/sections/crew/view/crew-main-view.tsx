import { useNavigate } from 'react-router-dom';

import Box from "@mui/material/Box"
import Button from "@mui/material/Button";
import Container from "@mui/material/Container"

import { paths } from 'src/routes/paths';

import CrewItem from "src/sections/blog/crew-item";


export default function CrewMainView() {

  const crew = paths.community.crew.main;
  const navigate = useNavigate();

  const moveToCrewMain = () => {
    navigate(crew);
  }

  return (
    <Container sx={{marginBottom: 5}}>
      <Box
        width={800}
        alignItems="center"
        sx={{ border: '2px solid lightgrey' }}
      >
        <Box paddingLeft={3}>
          <h2>크루 모집 게시판</h2>
        </Box>
        <Box paddingLeft={3} paddingRight={3}>
          <table style={{width: '100%', textAlign: "center", borderSpacing: "10px 10px"}}>
            <tr>
              <td><CrewItem /></td>
              <td><CrewItem /></td>
              <td><CrewItem /></td>
            </tr>
            <tr>
              <td><CrewItem /></td>
              <td><CrewItem /></td>
              <td><CrewItem /></td>
            </tr>
          </table>
        </Box>
        <Box style={{width: '100%', textAlign:'center', marginBottom: 10}}>
          <Button variant="outlined" onClick={moveToCrewMain}>더보기</Button>
        </Box>
      </Box>
    </Container>
  )
}
