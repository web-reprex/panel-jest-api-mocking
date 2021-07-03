import {
  basicAuthHeader,
  findTokenUrl,
  setTokenUrl
} from 'src/api/login/utils';
import service, { postItem } from 'src/api/service';
import { apiConstants, urls } from 'src/api/constants';
import { objectToUriParams } from 'src/api/service/utils';
import { GenericObj } from 'src/types';
import { findConsulConfig } from 'src/hooks/api/useConsul';

export interface PkceParams {
  [index: string]: string;
  client_id: string;
  code_challenge_method: string;
  code_challenge: string;
  redirect_uri: string;
  response_type: string;
  scope: string;
  state: string;
}

const createPkceAuthUrl = (authUrl: string, pkceParams: PkceParams) => {
  const uri = new URL(authUrl);
  uri.search = new URLSearchParams(pkceParams).toString();
  return uri.toString();
};

const ssoUrls = () => {
  const iam = findConsulConfig()?.services?.iam;
  if (!iam) return null;

  const basePath = `https://${iam.hostname}${iam.httpBasePath}`;
  return {
    authorizePath: `${basePath}${iam.options.authorizePath}`,
    tokenPath: `${basePath}${iam.options.tokenPath}`
  };
};

export const openSsoLoginPage = (code_challenge: string) => {
  const authorizePath = ssoUrls()?.authorizePath;
  return authorizePath
    ? window.location.assign(
        createPkceAuthUrl(authorizePath, {
          client_id: apiConstants.clientId,
          response_type: apiConstants.response_type,
          redirect_uri: urls.redirect,
          state: '',
          scope: apiConstants.scope,
          code_challenge_method: 'S256',
          code_challenge
        })
      )
    : null;
};

export const getSsoToken = async (code_verifier: string, code: string) => {
  const tokenPath = ssoUrls()?.tokenPath;
  if (!code_verifier && !tokenPath) return;
  Object.assign(service.defaults.headers.common, basicAuthHeader());
  setTokenUrl(tokenPath as string);
  return postItem(
    findTokenUrl(),
    objectToUriParams({
      client_id: apiConstants.clientId,
      redirect_uri: urls.redirect,
      grant_type: apiConstants.grant_type,
      code_verifier,
      code
    }) as GenericObj,
    ''
  );
};
