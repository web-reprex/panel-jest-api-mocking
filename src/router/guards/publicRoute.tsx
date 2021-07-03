import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({
  component: Component,
  isLoggedIn,
  restricted,
  ...rest
}: any) => (
  <Route
    {...rest}
    render={innerProps =>
      isLoggedIn && restricted ? (
        <Redirect to="/" />
      ) : (
        <Component {...innerProps} />
      )
    }
  />
);

export default PublicRoute;
