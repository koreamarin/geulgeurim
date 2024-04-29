import Box from "@mui/material/Box"
import Container from "@mui/material/Container"

type Props = {
  id: string;
};


export default function ShareDetailsView({ id }: Props) {
  return (
    <Container>
      <Box>
        그림평가 상세정보 {id}
      </Box>
    </Container>
  )
}
