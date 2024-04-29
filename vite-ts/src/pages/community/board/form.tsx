import { Helmet } from 'react-helmet-async';

import { BoardWriteView } from 'src/sections/board/view';

// ----------------------------------------------------------------------

export default function BoardFormPage() {
  return (
    <>
      <Helmet>
        <title>자유게시판 글쓰기</title>
      </Helmet>

      <BoardWriteView/>
    </>
  );
}
