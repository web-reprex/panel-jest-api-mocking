import { apiConstants, endpoints } from 'src/api/constants';
import { JwtResponseToken } from 'src/api/login/login';
import { ContentType, createBasicAuth } from 'src/api/service/utils';
export const findJwtToken = (): JwtResponseToken | null => {
  const token = localStorage.getItem('token');
  return token ? JSON.parse(token) : null;
};

export const setJwtToken = (token: JwtResponseToken) =>
  localStorage.setItem('token', JSON.stringify(token));

export const removeJwtToken = () => localStorage.removeItem('token');

export const basicAuthHeader = () => ({
  Authorization: createBasicAuth(apiConstants.clientId),
  'Content-Type': ContentType.formUrlEncoded
});

export const findTokenUrl = (): string =>
  localStorage.getItem('tokenUrl') ??
  `/${endpoints.authBase}/${endpoints.authToken}`;

export const setTokenUrl = (url: string) =>
  localStorage.setItem('tokenUrl', url);

export const removeTokenUrl = () => localStorage.removeItem('tokenUrl');
