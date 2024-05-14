import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CrewDetailView } from 'src/sections/crew/view';

// ----------------------------------------------------------------------

export default function CrewDetailPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title>크루모집 상세보기</title>
      </Helmet>

      <CrewDetailView id={`${id}`} />
    </>
  );
}
