import {
  Box, Container
} from '@mui/material';

type Props = {
  id: string;
};

type ServicePortfolio = {
  id: number;
  pofol_name: string;
  status: string;
  format: string;
  pieces: {
    title: string;
    program: string;
    contribution: string;
    content: string;
    pieceUrl: string;
  }[];
};

type UserPortfolio = {
  id: number;
  pofol_name: string;
  status: string;
  format: string;
  file_url: string[];
};

type Portfolio = ServicePortfolio | UserPortfolio;

const portfolio_service_format = {
  id: 1,
  pofol_name: "Digital Art Portfolio",
  status: "PUBLIC",
  format: "SERVICE",
  pieces: [
    {
      title: "Digital Landscape",
      program: "Photoshop",
      contribution: "100%",
      content: "이것은 첫 번째 작품입니다.",
      pieceUrl: "https://source.unsplash.com/random/1"
    },
    {
      title: "Digital Abstract",
      program: "Clip Studio",
      contribution: "기여도 80% 입니다.",
      content: "추상화풍의 웹툰을 그려봤어요. ",
      pieceUrl: "https://source.unsplash.com/random/2"
    }
  ]
}

const portfolio_user_format = {
  id: 8,
  pofol_name: "테스트 유저의 채색 포트폴리오",
  status: "PUBLIC",
  format: "USER",
  file_url: [
    "https://source.unsplash.com/random/1",
    "https://source.unsplash.com/random/2"
  ]
}


export default function PortfolioEdit({ id }: Props) {

  return (
    <Container>
      <Box>
        포트폴리오 수정
      </Box>
    </Container>
  )

}
