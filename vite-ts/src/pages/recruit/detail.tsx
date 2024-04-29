import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { RecruitDetailsView } from 'src/sections/recruit/view';

// ----------------------------------------------------------------------

export default function RecruitDetailPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title>상세공고</title>
      </Helmet>

      <RecruitDetailsView id={`${id}`} />
    </>
  );
}
