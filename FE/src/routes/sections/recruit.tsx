import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import MainLayout from 'src/layouts/main';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// RECRUIT
const RecruitMainPage = lazy(() => import('src/pages/recruit'));
const RecruitDetailPage = lazy(() => import('src/pages/recruit/detail'));
const RecruitSubmittedForm = lazy(() => import('src/pages/recruit/submitted/form'));
const RecruitSubmittedSuccess = lazy(() => import('src/pages/recruit/submitted/success'));
const RecruitSubmittedFail = lazy(() => import('src/pages/recruit/submitted/fail'));

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
        path: 'detail/:id',
        element: <RecruitDetailPage />,
      },
      {
        path: 'submitted/:id',
        element: <RecruitSubmittedForm />,
      },
      {
        path: 'submitted/fail/:id',
        element: <RecruitSubmittedFail />,
      },
      {
        path: 'submitted/success/:id',
        element: <RecruitSubmittedSuccess />,
      },
    ],
  },
];
