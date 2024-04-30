import Box from "@mui/material/Box"
import Container from "@mui/material/Container"


type Props = {
  id: string;
};

export default function RecruitApplySuccessView({ id }: Props) {
  return (
    <Container>
      <Box>
        제출성공
      </Box>
    </Container>
  )
}
