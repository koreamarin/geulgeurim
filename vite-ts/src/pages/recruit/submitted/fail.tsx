import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { RecruitSubmittedFailView } from 'src/sections/recruit/view';

// ----------------------------------------------------------------------

export default function RecruitSubmittedFailPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title>지원서 제출실패</title>
      </Helmet>

      <RecruitSubmittedFailView id={`${id}`} />
    </>
  );
}
