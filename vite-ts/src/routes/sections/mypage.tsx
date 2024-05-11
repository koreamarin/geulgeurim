import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/mypage';

import { LoadingScreen } from 'src/components/loading-screen';
// login에 대한 가드 추가하기

// ----------------------------------------------------------------------

const Inforamtion = lazy(() => import('src/pages/mypage'));
const Apply = lazy(() => import('src/pages/mypage/apply'));
const Interest = lazy(() => import('src/pages/mypage/interest'));
const Portfolio = lazy(() => import('src/pages/mypage/portfolio'));

// 작품
const Works = lazy(() => import('src/pages/mypage/works'));
const WorksDetail = lazy(() => import('src/pages/mypage/works/detail'));
const WorksEdit = lazy(() => import('src/pages/mypage/works/edit'));
const WorksWrite = lazy(() => import('src/pages/mypage/works/write'));

const Resume = lazy(() => import('src/pages/mypage/resume'));

// ----------------------------------------------------------------------

export const mypageRoutes = [
  {
    path: 'mypage',
    element: (
      // <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      // </AuthGuard>
    ),
    children: [
      { path: '', element: <Inforamtion /> },
      { path: 'apply', element: <Apply /> },
      { path: 'interest', element: <Interest /> },
      { path: 'portfolio', element: <Portfolio /> },
      {
        path: 'works',
        children: [
          {
            path: '',
            element: <Works />,
          },
          {
            path: 'write',
            element: <WorksWrite />,
          },
          {
            path: ':id',
            element: <WorksDetail />,
          },
          {
            path: ':id/edit',
            element: <WorksEdit />,
          },
        ],
      },
      { path: 'resume', element: <Resume /> },
    ],
  },
];
