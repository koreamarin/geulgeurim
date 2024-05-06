import Box from "@mui/material/Box"
import Container from "@mui/material/Container"


export default function ShareMainView() {
  return (
    <Container sx={{marginBottom: 5}}>
      <Box
        width={800}
        alignItems="center"
        sx={{ border: '2px solid lightgrey' }}
      >
        <Box paddingLeft={3}>
          <h2>자유게시판</h2>
        </Box>
      </Box>
    </Container>
  )
}
