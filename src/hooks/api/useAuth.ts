import { useEffect } from 'react';
import pkceChallenge, { generateChallenge } from 'pkce-challenge';
import { readAuthCodeFromURI } from 'src/api/service/utils';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { useAppDispatch } from 'src/store/redux/hooks';
import { setToken } from 'src/store/redux/modules/auth/authSlice';
import clog from 'src/utils/cuteLog';
import {
  getSsoToken,
  loginByUsernamePassword,
  openSsoLoginPage,
  setApiTokenAuthHeader
} from 'src/api/login/login';

const useSsoLogin = () => {
  const [codeVerifier, setCodeVerifier] = useLocalStorage('codeVerifier', '');
  const dispatch = useAppDispatch();
  const login = () => openSsoLoginPage(generateChallenge(codeVerifier));
  const logout = () => dispatch(setToken(null as any));
  clog('codeVerifier', 'info', codeVerifier)();

  const ssoEffect = () => {
    const code = readAuthCodeFromURI();
    if (code && codeVerifier)
      getSsoToken(codeVerifier, code).then(({ data }: any) => {
        dispatch(setToken(data));
        setApiTokenAuthHeader(data);
        clog('PkceJwtResponse', 'info', data)();
      });
    else setCodeVerifier(pkceChallenge().code_verifier);
  };
  return [login, logout, ssoEffect];
};
export const useRegularLogin = () => {
  const dispatch = useAppDispatch();
  const login = (username: string, password: string) =>
    loginByUsernamePassword(username, password).then(({ data }: any) => {
      dispatch(setToken(data));
      setApiTokenAuthHeader(data);
      clog('RegularLogin', 'info', data)();
    });
  const logout = () => dispatch(setToken(null as any));
  return [login, logout] as [
    (username: string, password: string) => Promise<void>,
    () => void
  ];
};
export const useAuth = () => {
  const [ssoLogin, ssoLogout, ssoEffect] = useSsoLogin();
  const [regularLogin, regularLogout] = useRegularLogin();
  const logout = () => {
    ssoLogout();
    regularLogout();
  };
  useEffect(() => {
    ssoEffect();
  }, []);

  return { ssoLogin, regularLogin, logout };
};
