import { Navigate, useRoutes } from 'react-router-dom';

// import { PATH_AFTER_LOGIN } from 'src/config-global';
import { nftRoutes } from './nft';
import { authRoutes } from './auth';
import { mainRoutes } from './main';
import { customRoutes } from './custom';
import { mypageRoutes } from './mypage';
import { recruitRoutes } from './recruit';
import { authDemoRoutes } from './auth-demo';
import { dashboardRoutes } from './dashboard';
import { communityRoutes } from './community';
import { componentsRoutes } from './components';

// ----------------------------------------------------------------------

export default function Router() {
  console.log('check');
  return useRoutes([
    // SET INDEX PAGE WITH SKIP HOME PAGE
    // {
    //   path: '/',
    //   element: <Navigate to={PATH_AFTER_LOGIN} replace />,
    // },

    // ----------------------------------------------------------------------

    // SET INDEX PAGE WITH HOME PAGE
    {
      path: '/',
      element: <Navigate replace to="/recruit" />,
    },

    // Auth routes
    ...authRoutes,
    ...authDemoRoutes,

    // Dashboard routes
    ...dashboardRoutes,

    // Main routes
    ...mainRoutes,

    // Components routes
    ...componentsRoutes,

    // Custom routes
    ...customRoutes,
    ...recruitRoutes,
    ...communityRoutes,
    ...nftRoutes,
    ...mypageRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
