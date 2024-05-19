import { Helmet } from 'react-helmet-async';

import { InformationView } from 'src/sections/mypage/view';

// ----------------------------------------------------------------------

export default function ApplicationHome() {
  return (
    <>
      <Helmet>
        <title>공고 내역</title>
      </Helmet>

      <InformationView />
    </>
  );
}
