import { Helmet } from 'react-helmet-async';

import PortfolioWriteUserFormatView from 'src/sections/mypage/view/portfolio-write-user-format';


export default function PortfolioWrite() {
  return (
    <>
      <Helmet>
        <title>포트폴리오 사용자 포맷 등록</title>
      </Helmet>

      <PortfolioWriteUserFormatView />
    </>
  );
}
