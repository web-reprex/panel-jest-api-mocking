import { GenericObj } from 'src/types/index';
import { setApiTokenAuthHeader } from 'src/api/login/login';
import {
  basicAuthHeader,
  findJwtToken,
  findTokenUrl,
  removeJwtToken,
  setJwtToken
} from 'src/api/login/utils';
import { objectToUriParams } from 'src/api/service/utils';
import axios, { AxiosRequestConfig } from 'axios';
import clog from 'src/utils/cuteLog';

export const refreshAuthToken = async (failedRequest: AxiosRequestConfig) => {
  const token = findJwtToken();
  const body = objectToUriParams({
    grant_type: 'refresh_token',
    refresh_token: token ? token.refresh_token : undefined
  }) as GenericObj;
  try {
    const tokenRefreshResponse = await axios.post(findTokenUrl(), body, {
      headers: basicAuthHeader()
    });
    setJwtToken(tokenRefreshResponse.data);
    setApiTokenAuthHeader(tokenRefreshResponse.data);
    clog('RefreshTokenResponse', 'dark', tokenRefreshResponse, failedRequest)();
    return Promise.resolve();
  } catch (error) {
    removeJwtToken();
    window.location.replace('/login');
    return Promise.reject(error);
  }
};
