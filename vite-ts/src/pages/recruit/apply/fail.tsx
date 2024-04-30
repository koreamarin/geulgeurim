import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { RecruitApplyFailView } from 'src/sections/recruit/view';

// ----------------------------------------------------------------------

export default function RecruitApplyFailPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title>지원서 제출실패</title>
      </Helmet>

      <RecruitApplyFailView id={`${id}`} />
    </>
  );
}
