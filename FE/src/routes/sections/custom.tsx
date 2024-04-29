import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import MainLayout from 'src/layouts/main';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const CustomPage = lazy(() => import('src/pages/custom'));

// ----------------------------------------------------------------------

export const customRoutes = [
  {
    // path: 'custom',
    element: (
      <MainLayout>
        <Suspense fallback={<SplashScreen />}>
          ddddddd
          <Outlet />
          qqqqq
        </Suspense>
      </MainLayout>
    ),
    children: [
      {
        path: 'custom',
        element: <CustomPage />,
      },
    ],
  },
  // {
  //   element: (
  //     <SimpleLayout>
  //       <Suspense fallback={<SplashScreen />}>
  //         <Outlet />
  //       </Suspense>
  //     </SimpleLayout>
  //   )
  // },
  // {
  //   element: (
  //     <CompactLayout>
  //       <Suspense fallback={<SplashScreen />}>
  //         <Outlet />
  //       </Suspense>
  //     </CompactLayout>
  //   )
  // },
];
