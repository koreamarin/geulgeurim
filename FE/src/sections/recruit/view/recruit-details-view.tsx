import Box from "@mui/material/Box"
import Container from "@mui/material/Container"

type Props = {
  id: string;
};


export default function RecruitDetailsView({ id }: Props) {
  return (
    <Container>
      <Box>
        상세정보{id}
      </Box>
    </Container>
  )
}
