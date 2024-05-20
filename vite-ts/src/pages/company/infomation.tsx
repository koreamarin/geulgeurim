import { Helmet } from 'react-helmet-async';

import CompanyInformationView from 'src/sections/mypage/view/company-info-view';

// ----------------------------------------------------------------------

export default function InformationHome() {
  return (
    <>
      <Helmet>
        <title>기업 기본 정보</title>
      </Helmet>

      <CompanyInformationView />
    </>
  );
}
