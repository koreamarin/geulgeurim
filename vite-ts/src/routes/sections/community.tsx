import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import MainLayout from 'src/layouts/main';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// COMMUNITY MAIN
const CommunityMainPage = lazy(() => import('src/pages/community'));

// ----------------------------------------------------------------------

// BOARD
const BoardMainPage = lazy(() => import('src/pages/community/board'));
const BoardWritePage = lazy(() => import('src/pages/community/board/form'));
const BoardDetailPage = lazy(() => import('src/pages/community/board/detail'));

// ----------------------------------------------------------------------

// CREW
const CrewMainPage = lazy(() => import('src/pages/community/crew'));
const CrewWritePage = lazy(() => import('src/pages/community/crew/form'));
const CrewDetailPage = lazy(() => import('src/pages/community/crew/detail'));
const CrewApplyPage = lazy(() => import('src/pages/community/crew/apply'));

// ----------------------------------------------------------------------

// SHARE
const ShareMainPage = lazy(() => import('src/pages/community/share'));
const ShareWritePage = lazy(() => import('src/pages/community/share/form'));
const ShareDetailPage = lazy(() => import('src/pages/community/share/detail'));

// ----------------------------------------------------------------------

export const communityRoutes = [
  {
    path: 'community',
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
        element: <CommunityMainPage />,
      },
      {
        path: 'board',
        children: [
          {
            path: '',
            element: <BoardMainPage />,
          },
          {
            path: ':id',
            element: <BoardDetailPage />,
          },
          {
            path: 'write',
            element: <BoardWritePage />,
          },
        ],
      },
      {
        path: 'share',
        children: [
          {
            path: '',
            element: <ShareMainPage />,
          },
          {
            path: ':id',
            element: <ShareDetailPage />,
          },
          {
            path: 'write',
            element: <ShareWritePage />,
          },
        ],
      },
      {
        path: 'crew',
        children: [
          {
            path: '',
            element: <CrewMainPage />,
          },
          {
            path: 'apply/:id',
            element: <CrewApplyPage />,
          },
          {
            path: ':id',
            element: <CrewDetailPage />,
          },
          {
            path: 'write',
            element: <CrewWritePage />,
          },
        ],
      },
    ],
  },
];
