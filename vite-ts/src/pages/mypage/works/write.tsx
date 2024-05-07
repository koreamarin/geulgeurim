import { Helmet } from 'react-helmet-async';

import WorksFormView from 'src/sections/mypage/view/works-form-view';

// ----------------------------------------------------------------------

export default function WorksWritePage() {
  return (
    <>
      <Helmet>
        <title>작품등록</title>
      </Helmet>

      <WorksFormView />
    </>
  );
}
