import Box from "@mui/material/Box"
import Container from "@mui/material/Container"

import RecruitDetail from "../recruit-detail";

type Props = {
  id: string;
};


export default function RecruitDetailsView({ id }: Props) {
  return (
    <Container>
      <Box>
        <RecruitDetail id={parseInt(id, 10)}/>
      </Box>
    </Container>
  )
}
