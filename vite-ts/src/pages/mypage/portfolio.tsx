import { Helmet } from 'react-helmet-async';

import { PortfolioView } from 'src/sections/mypage/view';

// ----------------------------------------------------------------------

export default function PortfolioHome() {
  return (
    <>
      <Helmet>
        <title>포트폴리오</title>
      </Helmet>

      <PortfolioView />
    </>
  );
}
