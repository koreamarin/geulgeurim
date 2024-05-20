import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CrewApplyView } from 'src/sections/crew/view';

// ----------------------------------------------------------------------

export default function CrewApplyPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title>크루모집 지원하기</title>
      </Helmet>

      <CrewApplyView id={`${id}`} />
    </>
  );
}
