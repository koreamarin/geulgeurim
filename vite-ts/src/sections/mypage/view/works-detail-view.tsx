import Box from "@mui/material/Box"
import Container from "@mui/material/Container"

import WorksDetail from "../works/works-detail";

type Props = {
  id: string;
};


export default function WorksDetailView({ id }: Props) {
  return (
    <Container>
      <WorksDetail workId={id}/>
    </Container>
  )
}
