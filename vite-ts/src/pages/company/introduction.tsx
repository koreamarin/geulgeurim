import { Helmet } from 'react-helmet-async';

import CompanyIntroduction from 'src/sections/mypage/company/company-introduction';

// ----------------------------------------------------------------------

export default function IntroductionHome() {
  return (
    <>
      <Helmet>
        <title>회사 소개</title>
      </Helmet>

      <CompanyIntroduction />
    </>
  );
}
