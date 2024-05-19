import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useGetUserDetail, useGetCompanyDetail } from 'src/api/user'; // Adjust the import path as necessary
import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

export default function CompanyIntroduction() {
  const { userDetailData, userDetailError, userDetailLoading } = useGetUserDetail();
  const { companyDetailData, companyDetailError, companyDetailLoading } = useGetCompanyDetail();

  if (userDetailLoading || companyDetailLoading) {
    return <SplashScreen />;
  }
  if (userDetailError || companyDetailError) {
    return <Typography sx={{ textAlign: 'center', mt: 4 }}>잘못된 접근입니다.</Typography>;
  }

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid xsOffset={1} xs={11}>
          <Typography variant="h3" component="h1">
            {companyDetailData?.company} 님
          </Typography>
        </Grid>
        <Grid mdOffset={1} md={2} xsOffset={4} xs={4}>
          <Avatar
            key={128}
            src={companyDetailData?.thumbnail || '/default-avatar.png'}
            alt={companyDetailData?.manager}
            sx={{ width: '100%', height: 'auto', aspectRatio: '1 / 1' }}
          />
        </Grid>
        <Grid md={8} mdOffset={0} xsOffset={1} xs={10}>
          <Typography variant="h5" component="h1" marginBottom={2}>
            기본 정보
          </Typography>
          <Box sx={{ borderBottom: '1px solid #ccc', paddingBottom: 2 }}>
            <Typography variant="subtitle1" color="gray">
              상호명
            </Typography>
            <Typography variant="body1">
              {companyDetailData?.company}
            </Typography>
          </Box>
          <Box sx={{ borderBottom: '1px solid #ccc', paddingBottom: 2, paddingTop: 2 }}>
            <Typography variant="subtitle1" color="gray">
              대표
            </Typography>
            <Typography variant="body1">
              {companyDetailData?.ceo_name}
            </Typography>
          </Box>
          <Box sx={{ borderBottom: '1px solid #ccc', paddingBottom: 2, paddingTop: 2 }}>
            <Typography variant="subtitle1" color="gray">
              설립일
            </Typography>
            <Typography variant="body1">
              {companyDetailData?.birthday}
            </Typography>
          </Box>
          <Box sx={{ borderBottom: '1px solid #ccc', paddingBottom: 2, paddingTop: 2 }}>
            <Typography variant="subtitle1" color="gray">
              주소
            </Typography>
            <Typography variant="body1">
              {companyDetailData?.address}
            </Typography>
          </Box>
          <Box sx={{ borderBottom: '1px solid #ccc', paddingBottom: 2, paddingTop: 2 }}>
            <Typography variant="subtitle1" color="gray">
              기업 소개
            </Typography>
            <Typography variant="body1">
              {companyDetailData?.introduce || '소개글이 없습니다.'}
            </Typography>
          </Box>
          <Box sx={{ borderBottom: '1px solid #ccc', paddingBottom: 2, paddingTop: 2 }}>
            <Typography variant="subtitle1" color="gray">
              복지제도
            </Typography>
            <Typography variant="body1">
              {/* 복지제도 항목을 여기에 나열 */}
              없음
            </Typography>
          </Box>
          <Box sx={{ borderBottom: '1px solid #ccc', paddingBottom: 2, paddingTop: 2 }}>
            <Typography variant="subtitle1" color="gray">
              계정 담당자
            </Typography>
            <Typography variant="body1">
              {userDetailData?.name}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
