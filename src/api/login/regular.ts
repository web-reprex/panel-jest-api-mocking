import { AxiosPromise } from 'axios';
import { JwtResponseToken } from 'src/api/login/login';
import {
  basicAuthHeader,
  findTokenUrl,
  setTokenUrl
} from 'src/api/login/utils';
import service, { postItem } from 'src/api/service';
import { apiConstants, endpoints, GrantTypes } from 'src/api/constants';

export const loginByUsernamePassword = (username: string, password: string) => {
  Object.assign(service.defaults.headers.common, basicAuthHeader());
  setTokenUrl(`/${endpoints.authBase}/${endpoints.authToken}`);

  return postItem(
    findTokenUrl(),
    new URLSearchParams({
      username,
      password,
      grant_type: GrantTypes.password,
      scope: apiConstants.scope,
      client_id: apiConstants.clientId
    }),
    ''
  ) as AxiosPromise<JwtResponseToken>;
};
