import { Helmet } from 'react-helmet-async';

import { CrewMainView } from 'src/sections/crew/view';
import { BoardMainView } from 'src/sections/board/view';
import { ShareMainView } from 'src/sections/share/view';

// ----------------------------------------------------------------------

export default function CommunityHome() {
  return (
    <>
      <Helmet>
        <title>Community 메인페이지</title>
      </Helmet>

      <h1>자유게시판 영역</h1>
      <BoardMainView />

      <h1>그림평가 게시판 영역</h1>
      <ShareMainView />

      <h1>크루모집 영역</h1>
      <CrewMainView />
    </>
  );
}
