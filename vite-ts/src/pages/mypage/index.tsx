import { Helmet } from 'react-helmet-async';

import { InformationView } from 'src/sections/mypage/view';

// ----------------------------------------------------------------------

export default function RecruitHome() {
  return (
    <>
      <Helmet>
        <title>상세 정보</title>
      </Helmet>

      <InformationView />
    </>
  );
}
