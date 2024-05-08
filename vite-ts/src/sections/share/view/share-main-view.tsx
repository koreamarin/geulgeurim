import { useNavigate } from 'react-router-dom';

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import { margin, textAlign } from "@mui/system"

import ShareItem from "src/sections/blog/share-item"
import { paths } from 'src/routes/paths';


export default function ShareMainView() {

  const share = paths.community.share.main;
  const navigate = useNavigate();

  const moveToShareMain = () => {
    navigate(share);
  }

  const list = [
    

  ]

  return (
    <Container sx={{marginBottom: 5}}>
      <Box
        width={800}
        alignItems="center"
        sx={{ border: '2px solid lightgrey' }}
      >
        <Box paddingLeft={3}>
          <h2>그림 평가 게시판</h2>
        </Box>
        <Box paddingLeft={3} paddingRight={3} marginBottom={0}>
          <table style={{width: '100%', textAlign: "center", borderSpacing: "10px 10px"}}>
            <tr>
              <td><ShareItem /></td>
              <td><ShareItem /></td>
              <td><ShareItem /></td>
            </tr>
            <tr>
              <td><ShareItem /></td>
              <td><ShareItem /></td>
              <td><ShareItem /></td>
            </tr>
          </table>
        </Box>
        <Box style={{width: '100%', textAlign:'center', marginBottom: 10}}>
          <Button variant="outlined" onClick={moveToShareMain}>더보기</Button>
        </Box>
      </Box>
    </Container>
  )
}
