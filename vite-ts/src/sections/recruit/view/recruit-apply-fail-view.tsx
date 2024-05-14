import Box from "@mui/material/Box"
import Container from "@mui/material/Container"


type Props = {
  id: string;
};


export default function RecruitApplyFailView({ id }: Props) {
  return (
    <Container>
      <Box>
        제출실패
      </Box>
    </Container>
  )
}
