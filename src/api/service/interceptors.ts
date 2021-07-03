import * as handlers from './handlers';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { refreshAuthToken } from 'src/api/login/refreshToken';
import service from 'src/api/service';
import { findJwtToken } from 'src/api/login/utils';

const onRequestFulfilled = async (config: AxiosRequestConfig) => {
  return handlers.onRequestFulfilled(config);
};
const onRequestRejected = (error: AxiosError) => Promise.reject(error);
const onResponseFulfilled = (response: AxiosResponse) => {
  return response;
};
const onResponseRejected = async (error: AxiosError) => {
  /*eslint-disable */
  const originalRequest = error.config;
  //@ts-ignore
  if (error.response!.status === 401 && !originalRequest._retry) {
    //@ts-ignore
    originalRequest._retry = true;
    try {
      await refreshAuthToken(originalRequest);
      Object.assign(originalRequest.headers, {
        Authorization: 'bearer ' + findJwtToken()!.access_token
      });
      return service(originalRequest);
    } catch (error) {
      /*eslint-disable */
      debugger;
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
};

export {
  onRequestFulfilled,
  onRequestRejected,
  onResponseFulfilled,
  onResponseRejected
};
