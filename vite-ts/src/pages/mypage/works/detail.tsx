import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import WorksDetailView from 'src/sections/mypage/view/works-detail-view';

// ----------------------------------------------------------------------

export default function WorksDetailPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title>작품상세</title>
      </Helmet>

      <WorksDetailView id={`${id}`} />
    </>
  );
}
