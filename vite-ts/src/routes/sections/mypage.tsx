import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/mypage';

import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const Inforamtion = lazy(() => import('src/pages/mypage'));
const Apply = lazy(() => import('src/pages/mypage/apply'));
const Interest = lazy(() => import('src/pages/mypage/interest'));
const Portfolio = lazy(() => import('src/pages/mypage/portfolio'));
const Works = lazy(() => import('src/pages/mypage/wokrs'));
const Resume = lazy(() => import('src/pages/mypage/resume'));

// ----------------------------------------------------------------------

export const mypageRoutes = [
  {
    path: 'mypage',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { path: '', element: <Inforamtion /> },
      { path: 'apply', element: <Apply /> },
      { path: 'interest', element: <Interest /> },
      { path: 'portfolio', element: <Portfolio /> },
      { path: 'works', element: <Works /> },
      { path: 'resume', element: <Resume /> },
    ],
  },
];
