import { Helmet } from 'react-helmet-async';

import ResumeFormView from 'src/sections/mypage/view/resume-form-view';

// ----------------------------------------------------------------------

export default function ResumeWritePage() {
  return (
    <>
      <Helmet>
        <title>이력서등록</title>
      </Helmet>

      <ResumeFormView />
    </>
  );
}
