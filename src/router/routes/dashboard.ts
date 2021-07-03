import { lazy } from 'react';
import { RoleAccessLevel } from '../types';

const Dashboard = lazy(() => import('src/views/pages/dashboard/dashboard'));

const DashboardRoutes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    exact: true,
    meta: {
      requiredLevel: RoleAccessLevel.User,
      title: 'Dashboard',
      icon: 'icon-home'
    }
  }
];

export default DashboardRoutes;
