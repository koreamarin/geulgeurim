import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { NFTListView } from 'src/sections/nft/view';

// ----------------------------------------------------------------------

export default function NFTHome() {
  const router = useRouter()
  useEffect(() => {
    router.push(paths.recruit.main)
  })
  return (
    <>
      <Helmet>
        <title>NFT 상점 메인페이지</title>
      </Helmet>

      <NFTListView />
    </>
  );
}


