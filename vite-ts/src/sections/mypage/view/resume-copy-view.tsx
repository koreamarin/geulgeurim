import Box from "@mui/material/Box"

import ResumeForm from "../resume/resume-form";

type Props = {
  id: string;
};

export default function ResumeCopyView({ id }: Props) {
  return (
    <Box>
      <ResumeForm copyId={id}/>
    </Box>
  )
}
