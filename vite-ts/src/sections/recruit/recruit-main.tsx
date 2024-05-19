import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import RecruitMainList from './recruit-main-list';
import RecruitMainFilter from './recruit-main-filter';


export default function RecruitMain() {
  return (
  <Box>
    <Typography variant="h3" sx={{display:'flex',  justifyContent: 'space-between', mb: 3}}>
      구인 · 구직
    </Typography>

    {/* 필터 */}
    <RecruitMainFilter/>
    
    {/* 메인 */}
    <RecruitMainList/>
  </Box>)
}
