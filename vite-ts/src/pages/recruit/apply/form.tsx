import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { RecruitApplyFormView } from 'src/sections/recruit/view';

// ----------------------------------------------------------------------

export default function RecruitApplyFormPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title>지원서 작성</title>
      </Helmet>

      <RecruitApplyFormView id={`${id}`} />
    </>
  );
}
