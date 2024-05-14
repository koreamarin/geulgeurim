import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import WorksEditView from 'src/sections/mypage/view/works-edit-view';

// ----------------------------------------------------------------------

export default function WorksEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title>작품수정</title>
      </Helmet>

      <WorksEditView id={`${id}`} />
    </>
  );
}
