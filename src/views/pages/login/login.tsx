import { useState } from 'react';
import { useAuth } from 'src/hooks/api/useAuth';
import { Button, TextField } from '@material-ui/core';
import loginStyle from './login.style';
import { useConsulPublicConfig } from 'src/hooks/api/useConsul';

const Login = () => {
  const { ssoLogin, regularLogin } = useAuth();
  const { data: config } = useConsulPublicConfig();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className={loginStyle}>
      <h3>Login Page</h3>
      {config?.services.iam ? (
        <Button color="primary" variant="contained" onClick={ssoLogin}>
          openSsoPage
        </Button>
      ) : null}
      <div>
        <h3>Regular login</h3>
        <TextField
          label="Username"
          name="username"
          id="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <TextField
          label="Password"
          name="password"
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <Button
        color="default"
        variant="contained"
        onClick={() => regularLogin(username, password)}
      >
        regularLogin
      </Button>
    </div>
  );
};

export default Login;
