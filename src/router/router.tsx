import { Suspense, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import Routes from './routes';
import { RoleAccessLevel, Route as RouteType } from './types';
import PrivateRoute from './guards/privateRoute';
import PublicRoute from './guards/publicRoute';
import Loading from 'src/views/components/loading/loading';
import { useAppSelector } from 'src/store/redux/hooks';
import { selectToken } from 'src/store/redux/modules/auth/authSlice';
import { useConsulPublicConfig } from 'src/hooks/api/useConsul';
import { useSnackbar } from 'notistack';
import Init from 'src/views/pages/init/init';

const routeGenerator = (routes: RouteType[], isLoggedIn: boolean) =>
  routes.map((route: RouteType, index) => {
    const { component, ...rest } = route;
    return route.meta.requiredLevel <= RoleAccessLevel.User ? (
      <PrivateRoute
        component={component}
        isLoggedIn={isLoggedIn}
        {...rest}
        key={index}
      />
    ) : (
      <PublicRoute
        component={component}
        isLoggedIn={isLoggedIn}
        restricted={true}
        {...rest}
        key={index}
      />
    );
  });
const AppRouter = () => {
  const token = useAppSelector(selectToken);
  const { data: config, isLoading, isError, error } = useConsulPublicConfig();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (isError)
      enqueueSnackbar(String(error), {
        variant: 'error',
        title: 'Consul Error'
      });
  }, [enqueueSnackbar, error, isError]);
  if (isLoading) return <Loading />;
  if (isError) return <div>Error in fetching consul data</div>;

  const redirectBasedOnInit = config?.configs.initialized ? (
    routeGenerator(Routes, !!token)
  ) : (
    <>
      <Route path="/init" component={Init} />
      <Redirect to="/init" />
    </>
  );

  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Switch>
          <Redirect exact from="/" to={`/dashboard`} />
          {redirectBasedOnInit}
          <Redirect to="/404" />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default AppRouter;
