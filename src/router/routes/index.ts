import LoginRoutes from './login';
import DashboardRoutes from './dashboard';
import ErrorsRoutes from './errors';

const Routes = [...LoginRoutes, ...DashboardRoutes, ...ErrorsRoutes];

export default Routes;
