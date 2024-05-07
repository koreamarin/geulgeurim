import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function BoardMainView() {
  return (
    <Container sx={{marginBottom: 5}}>
      <Box
        width={800}
        alignItems="center"
        sx={{ border: '2px solid lightgrey' }}
      >
        <Box paddingLeft={3}>
          <h2>자유 게시판</h2>
        </Box>

        <Box display="flex" sx={{ borderTop: '1px solid lightgrey'}}>
          <Box display="flex" paddingLeft={5} paddingRight={5} sx={{ width: '100%'}}>
            <Box display="flex" width="50%" sx={{ flexDirection: 'column' }}>
              <Box display="flex" alignItems="center" marginBottom={-3}>
                <img src="src/assets/icons/popular.png" alt=""/>
                <h3 style={{ marginLeft: 5 }}>인기글</h3>
              </Box>
              <Box paddingLeft={3}>
                <ul style={{paddingLeft: '0'}}>
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>4</li>
                </ul>
              </Box>
            </Box>
            <Box display="flex" paddingLeft={5} paddingRight={5} alignItems="center" sx={{borderLeft: '1px solid lightgrey', width:'50%'}}>
            <Box display="flex" width="50%" sx={{ flexDirection: 'column' }}>
              <Box display="flex" alignItems="center" marginBottom={-3}>
                <img src="src/assets/icons/popular.png" alt=""/>
                <h3 style={{ marginLeft: 5 }}>인기글</h3>
              </Box>
              <Box paddingLeft={3}>
                <ul style={{paddingLeft: '0'}}>
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>4</li>
                </ul>
              </Box>
            </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      </Container>
  );
}
