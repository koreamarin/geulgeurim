import { Helmet } from 'react-helmet-async';

import { WorksView } from 'src/sections/mypage/view';

// ----------------------------------------------------------------------

export default function RecruitHome() {
  return (
    <>
      <Helmet>
        <title>내 작품</title>
      </Helmet>

      <WorksView />
    </>
  );
}
