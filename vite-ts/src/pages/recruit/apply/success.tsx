import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { RecruitApplySuccessView } from 'src/sections/recruit/view';

// ----------------------------------------------------------------------

export default function RecruitApplySuccessPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title>지원서 제출 성공</title>
      </Helmet>

      <RecruitApplySuccessView id={`${id}`} />
    </>
  );
}
