import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import MainLayout from 'src/layouts/main';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// RECRUIT
const RecruitMainPage = lazy(() => import('src/pages/recruit'));
const RecruitDetailPage = lazy(() => import('src/pages/recruit/detail'));
const RecruitApplyForm = lazy(() => import('src/pages/recruit/apply/form'));
const RecruitApplySuccess = lazy(() => import('src/pages/recruit/apply/success'));
const RecruitApplyFail = lazy(() => import('src/pages/recruit/apply/fail'));

// ----------------------------------------------------------------------

export const recruitRoutes = [
  {
    path: 'recruit',
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
        element: <RecruitMainPage />,
      },
      {
        path: ':id',
        element: <RecruitDetailPage />,
      },
      {
        path: 'apply/:id',
        element: <RecruitApplyForm />,
      },
      {
        path: 'apply/:id/fail',
        element: <RecruitApplyFail />,
      },
      {
        path: 'apply/:id/success',
        element: <RecruitApplySuccess />,
      },
    ],
  },
];
