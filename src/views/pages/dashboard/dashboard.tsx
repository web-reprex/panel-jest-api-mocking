import { Button } from '@material-ui/core';
import jwtDecode from 'jwt-decode';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'src/hooks/api/useAuth';
import { useDashboard } from 'src/hooks/api/useDashboard';
import { useAppSelector } from 'src/store/redux/hooks';
import { selectToken } from 'src/store/redux/modules/auth/authSlice';
import { Counter } from 'src/views/components/counter/counter';
import { LanguageSwitcher } from 'src/views/components/language/languageSwitcher';
import { ThemeToggler } from 'src/views/components/theme/themeToggler';
// import { Users } from 'src/views/pages/users/users';

const Dashboard = () => {
  const { t } = useTranslation();
  const token = useAppSelector(selectToken);
  const { logout } = useAuth();
  const { data: dashboard, isLoading, isError } = useDashboard();

  return (
    <div>
      <Button color="primary" variant="contained" onClick={logout}>
        logout
      </Button>
      <ThemeToggler />
      <LanguageSwitcher />
      {/* <Users /> */}
      <h3>{t('dashboard')}</h3>
      <nav>
        <li>
          <NavLink to="/dashboard">{t('dashboard')}</NavLink>
        </li>
        <li>
          <NavLink to="/login">{t('login')}</NavLink>
        </li>
      </nav>
      <pre>
        {isError ? (
          <div>Error in fetching Dashboard</div>
        ) : isLoading ? (
          <div>Loading Dashboard</div>
        ) : (
          JSON.stringify(dashboard, null, 2)
        )}
      </pre>
      <pre>{JSON.stringify(jwtDecode(token!.access_token), null, 2)}</pre>
      <Counter />
    </div>
  );
};

export default Dashboard;
