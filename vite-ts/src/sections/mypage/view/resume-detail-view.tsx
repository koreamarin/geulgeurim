import Box from "@mui/material/Box"

import ResumeDetail from "../resume/resume-detail";

type Props = {
  id: string;
};


export default function ResumeDetailView({ id }: Props) {
  return (
    <Box>
      <ResumeDetail resumeId={id}/>
    </Box>
  )
}
