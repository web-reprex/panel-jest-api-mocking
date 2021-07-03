import { lazy } from 'react';
import { RoleAccessLevel } from '../types';

const Login = lazy(() => import('src/views/pages/login/login'));

const LoginRoutes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    exact: false,
    meta: {
      requiredLevel: RoleAccessLevel.Viewer,
      title: 'Login',
      icon: 'icon-login'
    }
  }
];

export default LoginRoutes;
