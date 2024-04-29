import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { RecruitSubmittedSuccessView } from 'src/sections/recruit/view';

// ----------------------------------------------------------------------

export default function RecruitSubmittedSuccessPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title>지원서 제출 성공</title>
      </Helmet>

      <RecruitSubmittedSuccessView id={`${id}`} />
    </>
  );
}
