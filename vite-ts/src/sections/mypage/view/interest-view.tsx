import Box from "@mui/material/Box"

import InterestList from "../interest-list"


export default function InterestView() {
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
        <InterestList />
      </Box>
  )
}
