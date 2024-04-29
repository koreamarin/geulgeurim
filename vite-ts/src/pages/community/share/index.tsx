import { Helmet } from 'react-helmet-async';

import { ShareListView } from 'src/sections/share/view';


// ----------------------------------------------------------------------

export default function ShareMainPage() {
  return (
    <>
      <Helmet>
        <title>그림평가 게시판</title>
      </Helmet>

      <ShareListView />
    </>
  );
}
