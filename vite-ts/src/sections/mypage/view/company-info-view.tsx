import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import InformationRecentPost from '../information/information-recent-post';
import CompanyInformationProfile from '../company/company-information-profile';
import InformationRecentComment from '../information/information-recent-comment';

export default function CompanyInformationView() {
  return (
      <Box>

        <CompanyInformationProfile />
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
