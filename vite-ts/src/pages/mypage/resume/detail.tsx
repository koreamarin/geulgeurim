import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import ResumeDetailView from 'src/sections/mypage/view/resume-detail-view';

// ----------------------------------------------------------------------

export default function ResumeDetailPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title>이력서상세</title>
      </Helmet>

      <ResumeDetailView id={`${id}`} />
    </>
  );
}
