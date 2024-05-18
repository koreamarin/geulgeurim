import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import CardHeader from "@mui/material/CardHeader"
import Typography from "@mui/material/Typography"

import { usePortfolioDetailUserFormat } from "src/api/portfolio"

import Image from "src/components/image"
import { SplashScreen } from "src/components/loading-screen"

type Props = {
  portfolId : number
}

export default function ResumeFormPortfolioUserPreview({portfolId}: Props) {
  const {portfolioDetailUserData, portfolioDeatilUserLoading, portfolioDetailUserError} = usePortfolioDetailUserFormat(portfolId)
  if (portfolioDeatilUserLoading) {
    return <SplashScreen />
  }
  if (portfolioDetailUserError) {
    <Typography sx={{ textAlign: 'center', mt: 4 }}>잘못된 접근입니다.</Typography>
  }
  return (
    <Card  sx={{ p: 3 }}>
      <CardHeader sx={{ mb: 2, pt: 0 }} title={portfolioDetailUserData.pofolName}/>
      <Stack>
        {portfolioDetailUserData.fileUrls.map((item, index) => (
          <Image key={index} alt='사진 없음' src={(item !== '' || !item) ? item : '/no_image.png'} marginTop={3}/>
        ))}
      </Stack>
    </Card>
  )
}
