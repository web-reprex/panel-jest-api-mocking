import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }: any) => (
  <Route
    {...rest}
    render={innerProps =>
      isLoggedIn ? <Component {...innerProps} /> : <Redirect to="/login" />
    }
  />
);

export default PrivateRoute;
