import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import ResumeCopyView from 'src/sections/mypage/view/resume-copy-view';

// ----------------------------------------------------------------------

export default function ResumeCopyPage() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title>이력서등록</title>
      </Helmet>

      <ResumeCopyView id={`${id}`} />
    </>
  );
}
