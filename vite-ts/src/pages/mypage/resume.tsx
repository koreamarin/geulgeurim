import { Helmet } from 'react-helmet-async';

import { ResumeView } from 'src/sections/mypage/view';

// ----------------------------------------------------------------------

export default function RecruitHome() {
  return (
    <>
      <Helmet>
        <title>이력서</title>
      </Helmet>

      <ResumeView />
    </>
  );
}
