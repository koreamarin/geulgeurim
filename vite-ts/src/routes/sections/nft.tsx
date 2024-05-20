import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import MainLayout from 'src/layouts/main';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// NFT
const NFTMainPage = lazy(() => import('src/pages/nft'));
const NFTDetailPage = lazy(() => import('src/pages/nft/detail'));

// ----------------------------------------------------------------------

export const nftRoutes = [
  {
    path: 'nft',
    element: (
      <MainLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </MainLayout>
    ),
    children: [
      {
        path: '',
        element: <NFTMainPage />,
      },
      {
        path: ':id',
        element: <NFTDetailPage />,
      },
    ],
  },
];
