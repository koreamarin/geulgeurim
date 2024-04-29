import { Helmet } from 'react-helmet-async';

import { NFTListView } from 'src/sections/nft/view';

// ----------------------------------------------------------------------

export default function NFTHome() {
  return (
    <>
      <Helmet>
        <title>NFT 상점 메인페이지</title>
      </Helmet>

      <NFTListView />
    </>
  );
}
