import Box from "@mui/material/Box"
import Container from "@mui/material/Container"

type Props = {
  id: string;
};


export default function CrewApplyView({ id }: Props) {
  return (
    <Container>
      <Box>
        자유게시판 상세정보 {id}
      </Box>
    </Container>
  )
}
