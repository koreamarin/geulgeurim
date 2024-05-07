import Box from "@mui/material/Box"

import WorksDetail from "../works/works-detail";

type Props = {
  id: string;
};


export default function WorksDetailView({ id }: Props) {
  return (
    <Box>
      <WorksDetail workId={id}/>
    </Box>
  )
}
