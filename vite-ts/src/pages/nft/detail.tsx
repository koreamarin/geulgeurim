import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { NFTDetailView } from 'src/sections/nft/view';

// ----------------------------------------------------------------------

export default function NFTDetailPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title>NFT 상세페이지</title>
      </Helmet>

      <NFTDetailView id={`${id}`} />
    </>
  );
}
