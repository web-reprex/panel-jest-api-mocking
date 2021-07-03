import { ResponseType } from './service/types';

export enum GrantTypes {
  authorizationCode = 'authorization_code',
  refreshToken = 'refresh_token',
  password = 'password',
  clientCredentials = 'client_credentials'
}

// helper functions
const hostOrigin = window.location.origin;
const originSlash = hostOrigin + '/';
const redirectUrl = (addr = '') =>
  hostOrigin + `${apiConstants.routePrefix}/${addr}`;

// API/Header Constants
export const apiConstants = {
  clientId: 'panel',
  response_type: ResponseType.code,
  scope: '',
  grant_type: GrantTypes.authorizationCode,
  apiPrefix: 'api/V1/',
  apiVersion: 'v1',
  routePrefix: process.env.REACT_APP_ROUTE_PREFIX
};

// API Endpoints
export const endpoints = {
  login: 'login',
  authBase: 'authentication-server/oauth',
  authorize: 'authorize',
  authToken: 'token',
  xmppWebsocket: 'ws',
  fileService: 'file-service/minio',
  publicPlatformConfig: `${apiConstants.apiVersion}/kv/configs/public/panel.json?raw`
};

// App URLs
export const urls = {
  base: `${hostOrigin}`,
  redirect: redirectUrl(endpoints.login),
  oauth: `/${endpoints.authBase}/${endpoints.authToken}`,
  fileService: originSlash + endpoints.fileService,
  publicPlatformConfig: originSlash + endpoints.publicPlatformConfig
};
