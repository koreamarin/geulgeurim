import { Helmet } from 'react-helmet-async';

import { WorksView } from 'src/sections/mypage/view';

// ----------------------------------------------------------------------

export default function WorksHome() {
  return (
    <>
      <Helmet>
        <title>내 작품</title>
      </Helmet>

      <WorksView />
    </>
  );
}
