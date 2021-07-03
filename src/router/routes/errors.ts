import { lazy } from 'react';
import { RoleAccessLevel } from '../types';

const Error404 = lazy(() => import('../../views/pages/errors/error404'));
const Error503 = lazy(() => import('../../views/pages/errors/error503'));

const ErrorsRoutes = [
  {
    path: '/404',
    name: 'error_404',
    component: Error404,
    exact: false,
    meta: {
      requiredLevel: RoleAccessLevel.Viewer,
      title: 'Error 404',
      icon: 'icon-404'
    }
  },
  {
    path: '/503',
    name: 'error_503',
    component: Error503,
    exact: false,
    meta: {
      requiredLevel: RoleAccessLevel.Viewer,
      title: 'Error 503',
      icon: 'icon-503'
    }
  }
];

export default ErrorsRoutes;
