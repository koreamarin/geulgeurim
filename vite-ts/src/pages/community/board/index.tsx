import { Helmet } from 'react-helmet-async';

import { BoardListView } from 'src/sections/board/view';


// ----------------------------------------------------------------------

export default function BoardMainPage() {
  return (
    <>
      <Helmet>
        <title>자유게시판</title>
      </Helmet>

      <BoardListView />
    </>
  );
}
