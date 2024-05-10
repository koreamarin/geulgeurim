import { Helmet } from 'react-helmet-async';
import PortfolioWriteView from 'src/sections/mypage/view/portfolio-write';


export default function PortfolioWrite() {
  return (
    <>
      <Helmet>
        <title>포트폴리오 글그림 포맷 등록</title>
      </Helmet>

      <PortfolioWriteView />
    </>
  );
}
