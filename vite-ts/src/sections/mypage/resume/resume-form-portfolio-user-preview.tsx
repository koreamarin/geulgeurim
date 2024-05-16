import Card from "@mui/material/Card"
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from "@mui/material/CardHeader"
import Typography from "@mui/material/Typography"

import Image from "src/components/image"

type Props = {
  portfolId : number
}


const portfolioDummyList = [
  {
    pofol_id: 1,
    pofol_name: "더미포트폴리오 제목1",
    status: "PUBLIC",
    pieces: [
      {
        title: "작품1",
        program: "Photoshop",
        contribution: "100%",
        content: "",
        pieceUrl: "https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_1.jpg"
      },
      {
        title: "작품2",
        program: "Clip Studio",
        contribution: "기여도 80% 입니다.",
        content: "추상화풍의 웹툰을 그려봤어요. ",
        pieceUrl: "https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_2.jpg"
      }
    ]
  },
  {
    pofol_id: 3,
    pofol_name: "더미포트폴리오 제목3",
    status: "PUBLIC",
    pieces: [
      {
        title: "작품5",
        program: "Photoshop",
        contribution: "100%",
        content: "",
        pieceUrl: "https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_5.jpg"
      },
      {
        title: "작품6",
        program: "Clip Studio",
        contribution: "기여도 80% 입니다.",
        content: "추상화풍의 웹툰을 그려봤어요. ",
        pieceUrl: "https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_6.jpg"
      }
    ]
  }
]

export default function ResumeFormPortfolioUserPreview({portfolId}: Props) {
  const data = portfolioDummyList.find((portfolio) => portfolio.pofol_id === portfolId)
  return (
    <Card sx={{ p: 3, boxShadow:'none' }}>
      <CardHeader sx={{ mb: 2, pt: 0 }} title={data?.pofol_name}/>
      {data?.pieces.map((item, index) => (
        <Grid key={index} container spacing={2} mt={3} >
          <Grid xs={12} lg={6}>
            <Image alt='사진 없음' src={item.pieceUrl}/>
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
