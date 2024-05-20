import { Helmet } from 'react-helmet-async';

import { ResumeView } from 'src/sections/mypage/view';

// ----------------------------------------------------------------------

export default function ResumeHome() {
  return (
    <>
      <Helmet>
        <title>이력서</title>
      </Helmet>

      <ResumeView />
    </>
  );
}
