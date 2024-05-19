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
// 포트폴리오
const Portfolio = lazy(() => import('src/pages/mypage/portfolio'));
const PortfolioDetail = lazy(() => import('src/pages/mypage/portfolio-detail'));
const PortfolioDetailUserFormat = lazy(() => import('src/pages/mypage/portfolio-detail-user-format'));
const PortfolioWriteView = lazy(() => import('src/pages/mypage/portfolio-write'));
const PortfolioWriteUserFormatView = lazy(() => import('src/pages/mypage/portfolio-write-user-format'));
const PortfolioEdit = lazy(() => import('src/pages/mypage/portfolio-edit'));
// 작품
const Works = lazy(() => import('src/pages/mypage/works'));
const WorksDetail = lazy(() => import('src/pages/mypage/works/detail'));
const WorksEdit = lazy(() => import('src/pages/mypage/works/edit'));
const WorksWrite = lazy(() => import('src/pages/mypage/works/write'));

// 이력서
const Resume = lazy(() => import('src/pages/mypage/resume'));
const ResumeDetail = lazy(() => import('src/pages/mypage/resume/detail'));
const ResumeEdit = lazy(() => import('src/pages/mypage/resume/edit'));
const ResumeWrite = lazy(() => import('src/pages/mypage/resume/write'));
const ResumeCopy = lazy(() => import('src/pages/mypage/resume/copy'));
// 크루
const Crew = lazy(() => import('src/pages/mypage/crew'));

// 회사
const CompanyInfo = lazy(() => import('src/pages/company/infomation'));
const CompanyIntroduction = lazy(() => import('src/pages/company/introduction'));
const CompanyApplications = lazy(() => import('src/pages/company/application'));
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
      { path: 'crew', element: <Crew />},
      {
        path: 'portfolio',
        children: [
          {
            path: '',
            element: <Portfolio />
          },
          {
            path: 'detail/:id',
            element: <PortfolioDetail />
          },
          {
            path: 'detail/user/:id',
            element: <PortfolioDetailUserFormat />
          },
          {
            path: 'write',
            element: <PortfolioWriteView />
          },
          {
            path: 'write/user',
            element: <PortfolioWriteUserFormatView />
          },
          {
            path: 'edit/:id',
            element: <PortfolioEdit />
          },
        ]

       },
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
      {
        path: 'resume',
        children: [
          {
            path: '',
            element: <Resume />,
          },
          {
            path: 'write',
            element: <ResumeWrite />,
          },
          {
            path: 'write/:id',
            element: <ResumeCopy />
          },
          {
            path: ':id',
            element: <ResumeDetail />,
          },
          {
            path: ':id/edit',
            element: <ResumeEdit />,
          },
        ],
      },
      {
        path: 'company',
        children: [
          {
            path: '',
            element: <CompanyInfo />,
          },
          {
            path: 'introduction',
            element: <CompanyIntroduction />,
          },
          {
            path: 'applicants',
            element: <CompanyApplications />
          }
        ],
      },
    ],
  },
];
