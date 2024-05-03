import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function BoardMainView() {
  return (
    <Container>
      <Box
        height={200}
        width={800}
        margin="auto"
        alignItems="center"
        sx={{ border: '1px solid lightgrey' }}
      >
        <Box paddingLeft={3}>
          <h2>자유게시판</h2>
        </Box>

        <Box display="flex" alignItems="center" sx={{ borderTop: '1px solid lightgrey'}}>
          <Box display="flex" paddingLeft={6} sx={{borderRight: '1px solid lightgrey', flexDirection: 'row', width: '100%', height: '100%'}}>
            <Box display="flex" alignItems="center" width="50%">
              <img src="src/assets/icons/popular.png" alt=""/>
              <h3 style={{marginLeft: 3}}>인기글</h3>
            </Box>
            <Box display="flex" alignItems="center" sx={{borderLeft: '1px solid lightgrey'}}>
              <img src="src/assets/icons/new.png" alt=""/>
              <h3 style={{marginLeft: 3}}>최신글</h3>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
