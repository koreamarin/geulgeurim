import { Helmet } from 'react-helmet-async';

import { ApplyView } from 'src/sections/mypage/view';

// ----------------------------------------------------------------------

export default function InformationHome() {
  return (
    <>
      <Helmet>
        <title>기업 기본 정보</title>
      </Helmet>

      <ApplyView />
    </>
  );
}
