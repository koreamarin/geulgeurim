import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ShareDetailsView } from 'src/sections/share/view';

// ----------------------------------------------------------------------

export default function ShareDetailPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title>그림 평가 게시판 상세보기</title>
      </Helmet>

      <ShareDetailsView id={`${id}`} />
    </>
  );
}
