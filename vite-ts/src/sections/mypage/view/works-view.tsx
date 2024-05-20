import Box from '@mui/material/Box';

import WorksListPosts from '../works/works-list-posts';


export default function WorksView() {
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
      <WorksListPosts />
    </Box>
  );
}