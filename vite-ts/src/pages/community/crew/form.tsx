import { Helmet } from 'react-helmet-async';

import { CrewWriteView } from 'src/sections/crew/view';

// ----------------------------------------------------------------------

export default function CrewFormPage() {
  return (
    <>
      <Helmet>
        <title>크루모집 글쓰기</title>
      </Helmet>

      <CrewWriteView/>
    </>
  );
}
