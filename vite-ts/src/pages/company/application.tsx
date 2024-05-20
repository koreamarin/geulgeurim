import { Helmet } from 'react-helmet-async';

import CompanyApplicants from 'src/sections/mypage/company/company-applicants';

// ----------------------------------------------------------------------

export default function ApplicationHome() {
  return (
    <>
      <Helmet>
        <title>공고 내역</title>
      </Helmet>

      <CompanyApplicants />
    </>
  );
}
