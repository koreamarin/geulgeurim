import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import CardMedia from "@mui/material/CardMedia"
import CardHeader from "@mui/material/CardHeader"
import Typography from "@mui/material/Typography"

import { usePortfolioDetailUserFormat } from "src/api/portfolio"

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
          // <Image key={index} alt='사진 없음' src={(item !== '' || !item) ? `${item}?timestamp=${new Date().getTime()}` : '/no_image.png'} crossOrigin='anonymous' marginTop={3}/>
          <CardMedia
            component="img"
            crossOrigin='anonymous'
            image={(item !== '' || !item) ? `${item}?timestamp=${new Date().getTime()}` : '/no_image.png'}
            alt="사진 없음"
            key={index}
            sx={{
              marginTop: 3,
            }}
          />
        ))}
      </Stack>
    </Card>
  )
}
