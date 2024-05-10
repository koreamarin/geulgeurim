import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import PortfolioEdit from 'src/sections/mypage/view/portfolio-edit-view';


export default function PortfolioWrite() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title>포트폴리오 수정</title>
      </Helmet>

      <PortfolioEdit id={`${id}`} />
    </>
  );
}
