import { Helmet } from 'react-helmet-async';

import { ShareWriteView } from 'src/sections/share/view';

// ----------------------------------------------------------------------

export default function ShareFormPage() {
  return (
    <>
      <Helmet>
        <title>그림평가 게시판 글쓰기</title>
      </Helmet>

      <ShareWriteView />
    </>
  );
}
