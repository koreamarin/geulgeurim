import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import ResumeEditView from 'src/sections/mypage/view/resume-edit-view';

// ----------------------------------------------------------------------

export default function ResumeEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title>이력서수정</title>
      </Helmet>

      <ResumeEditView id={`${id}`} />
    </>
  );
}
