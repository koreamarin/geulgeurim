import Card from "@mui/material/Card"
import Stack from "@mui/material/Stack"
import CardHeader from "@mui/material/CardHeader"

import Image from "src/components/image"

type Props = {
  portfolId : number
}

const portfolioDummyList = [
  {
    pofol_id: 2,
    pofol_name: "더미포트폴리오 제목2",
    status: "PUBLIC",
    fileUrls: [
      "https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_6.jpg",
      "https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_8.jpg"
    ]
  },
  {
    pofol_id: 4,
    pofol_name: "더미포트폴리오 제목4",
    status: "PUBLIC",
    fileUrls: [
      "https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_7.jpg"
    ]
  },
  {
    pofol_id: 5,
    pofol_name: "더미포트폴리오 제목5",
    status: "PUBLIC",
    fileUrls: [
      "https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_8.jpg"
    ]
  },
  {
    pofol_id: 6,
    pofol_name: "더미포트폴리오 제목6",
    status: "PUBLIC",
    fileUrls: [
      "https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_9.jpg"
    ]
  }
]

export default function ResumeFormPortfolioServicePreview({portfolId}: Props) {
  const data = portfolioDummyList.find((portfolio) => portfolio.pofol_id === portfolId)
  return (
    <Card  sx={{ p: 3 }}>
      <CardHeader sx={{ mb: 2, pt: 0 }} title={data?.pofol_name}/>
      <Stack>
        {data?.fileUrls.map((item, index) => (
          <Image key={index} alt='사진 없음' src={item} marginTop={3}/>
        ))}
      </Stack>
    </Card>
  )
}
