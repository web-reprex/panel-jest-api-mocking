import { lazy } from 'react';
import { RoleAccessLevel } from '../types';

const Init = lazy(() => import('src/views/pages/init/init'));

const InitRoutes = [
  {
    path: '/init',
    name: 'init',
    component: Init,
    exact: false,
    meta: {
      requiredLevel: RoleAccessLevel.Viewer,
      title: 'Init',
      icon: 'icon-home'
    }
  }
];

export default InitRoutes;
