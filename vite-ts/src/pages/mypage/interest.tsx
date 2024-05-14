import { Helmet } from 'react-helmet-async';

import { InterestView } from 'src/sections/mypage/view';

// ----------------------------------------------------------------------

export default function RecruitHome() {
  return (
    <>
      <Helmet>
        <title>관심있는 공고</title>
      </Helmet>

      <InterestView />
    </>
  );
}
