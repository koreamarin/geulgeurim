import { Helmet } from 'react-helmet-async';

import { ApplyView } from 'src/sections/mypage/view';

// ----------------------------------------------------------------------

export default function RecruitHome() {
  return (
    <>
      <Helmet>
        <title>지원 내역</title>
      </Helmet>

      <ApplyView />
    </>
  );
}
