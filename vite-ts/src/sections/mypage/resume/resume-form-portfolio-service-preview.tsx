import Card from "@mui/material/Card"
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from "@mui/material/CardHeader"
import Typography from "@mui/material/Typography"

import { usePortfolioDetail } from "src/api/portfolio";

import Image from "src/components/image"
import { SplashScreen } from "src/components/loading-screen";

type Props = {
  portfolId : number
}

export default function ResumeFormPortfolioServicePreview({portfolId}: Props) {
  // const data = portfolioDummyList.find((portfolio) => portfolio.pofol_id === portfolId)
  const {portfolioDetailData, portfolioDeatilLoading, portfolioDetailError} = usePortfolioDetail(portfolId)
  if (portfolioDeatilLoading) {
    return <SplashScreen />
  }
  if (portfolioDetailError) {
    <Typography sx={{ textAlign: 'center', mt: 4 }}>잘못된 접근입니다.</Typography>
  }
  console.log('포트폴리오', portfolioDetailData)
  return (
    <Card sx={{ p: 3, boxShadow:'none' }}>
      <CardHeader sx={{ mb: 2, pt: 0 }} title={portfolioDetailData?.pofolName}/>
      {portfolioDetailData?.pieces.map((item, index) => (
        <Grid key={index} container spacing={2} mt={3} >
          <Grid xs={12} lg={6}>
            <Image alt='사진 없음' src={(item.pieceUrl !== '') ? item.pieceUrl : '/no_image.png'}/>
          </Grid>
          <Grid  xs={12} lg={6}>
            <Card sx={{height:"100%", p:3, alignContent:'center'}}>
              <Typography variant="h6" gutterBottom>{item.title}</Typography>
              <Typography variant="body1" gutterBottom>사용 프로그램: {item.program}</Typography>
              <Typography variant="body1" gutterBottom>기여도: {item.contribution}</Typography>
              <Typography variant="body1" gutterBottom>{item.content}</Typography>
            </Card>
          </Grid>
        </Grid>
      ))}
    </Card>
  )
}
