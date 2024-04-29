import { Helmet } from 'react-helmet-async';

import { CrewListView } from 'src/sections/crew/view';


// ----------------------------------------------------------------------

export default function CrewMainPage() {
  return (
    <>
      <Helmet>
        <title>크루모집 게시판</title>
      </Helmet>

      <CrewListView />
    </>
  );
}
