import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { PortfolioDetailView } from 'src/sections/mypage/view';

// PortfolioDetailView

// ----------------------------------------------------------------------

export default function PortfolioDetailPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title>포트폴리오 상세</title>
      </Helmet>

      <PortfolioDetailView id={`${id}`} />
    </>
  );
}
