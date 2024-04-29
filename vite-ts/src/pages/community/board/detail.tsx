import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { BoardDetailsView } from 'src/sections/board/view';

// ----------------------------------------------------------------------

export default function BoardDetailPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title>자유게시판 상세보기</title>
      </Helmet>

      <BoardDetailsView id={`${id}`} />
    </>
  );
}
