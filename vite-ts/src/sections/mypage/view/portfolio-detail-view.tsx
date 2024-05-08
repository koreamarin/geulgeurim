import { useLocation } from 'react-router-dom';

type Props = {
  id: number;
};

const portfolio = {
  id: 1,
  pofol_name: "Digital Art Portfolio",
  status: "PUBLIC",
  format: "SERVICE",
  pieces: [
    {
      imageUrl: "https://source.unsplash.com/random/1",
      name: "Digital Landscape",
      software: "Photoshop"
    },
    {
      imageUrl: "https://source.unsplash.com/random/2",
      name: "Digital Abstract",
      software: "Clip Studio"
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

export default function PortfolioDetailView({ id }: Props) {
  const location = useLocation();

  return (
    <div>
      <h1>{portfolio?.pofol_name}</h1>

  </div>
  )


}
