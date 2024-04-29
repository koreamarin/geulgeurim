import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { RecruitSubmittedFormView } from 'src/sections/recruit/view';

// ----------------------------------------------------------------------

export default function RecruitSubmittedFormPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title>지원서 작성</title>
      </Helmet>

      <RecruitSubmittedFormView id={`${id}`} />
    </>
  );
}
