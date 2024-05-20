import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import InformationProfile from '../information/information-profile';
import InformationRecentPost from '../information/information-recent-post';
import InformationRecentComment from '../information/information-recent-comment';

export default function InformationView() {
  return (
      <Box>

        <InformationProfile />
        <Grid container spacing={3} sx={{pt:10}}>
          <Grid xsOffset={1} xs={10} md={5}>
            {/* 최근 글 */}
            <InformationRecentPost />
          </Grid>

          <Grid xsOffset={1} mdOffset={0} xs={10} md={5}>
            {/* 최근 코멘트 */}
            <InformationRecentComment />
          </Grid>
        </Grid>

      </Box>
  );
}
