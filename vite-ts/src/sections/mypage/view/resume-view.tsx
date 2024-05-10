import Box from "@mui/material/Box"

import ResumeList from "../resume/resume-list"

export default function ResumeView() {
  return (
      <Box sx={{
      paddingLeft: {
        xs: 5,
        sm: 5,
        md: 10,
        lg: 10
      },
      paddingRight: {
        xs: 5,
        sm: 5,
        md: 10,
        lg: 10
      }
    }}>
        <ResumeList />
      </Box>
  )
}
