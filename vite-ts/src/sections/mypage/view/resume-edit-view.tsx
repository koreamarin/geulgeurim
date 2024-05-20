import Box from "@mui/material/Box"

import ResumeEdit from "../resume/resume-edit";

type Props = {
  id: string;
};


export default function ResumeEditView({ id }: Props) {
  return (
    <Box>
      <ResumeEdit id={id}/>
    </Box>
  )
}
