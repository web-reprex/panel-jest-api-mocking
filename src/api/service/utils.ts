import { GenericObj } from 'src/types/index';
import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';
import { OAuthToken } from './types';

export enum ContentType {
  json = 'application/json',
  formUrlEncoded = 'application/x-www-form-urlencoded'
}
export const objectToUriParams = (obj: GenericObj, enableToString = true) =>
  enableToString
    ? new URLSearchParams(obj).toString()
    : new URLSearchParams(obj);

export const createBasicAuth = (client_id: string, client_secret = '') =>
  'Basic ' + btoa(`${client_id}:${client_secret}`);

export const readAuthCodeFromURI = () => {
  const search = new URLSearchParams(window.location.search);
  return search.get('code') ?? '';
};

export const isAbsoluteUrl = (url: string) => url.includes('http');

export const apiConfig = (
  method: Method,
  url: string,
  baseURL = '',
  data: GenericObj = {}
) => ({
  method,
  url,
  data,
  baseURL: isAbsoluteUrl(url) ? baseURL : `${window.location.origin}/${baseURL}`
});

export const retryFailedOn401Request = (
  token: OAuthToken,
  original_request: AxiosRequestConfig,
  onResponseFullFilled: CallableFunction,
  errorHandler: CallableFunction,
  language = 'en-us'
) => {
  original_request.headers.Authorization = 'Bearer ' + token.access_token;
  original_request.headers['Accept-Language'] = language;
  original_request.headers['Content-Type'] = 'application/json';
  return new Promise((resolve, reject) => {
    axios
      .request(original_request)
      .then(response => {
        onResponseFullFilled();
        resolve(response);
      })
      .catch(error => {
        errorHandler(error);
        reject(error);
      });
  });
};
export const holdRequestUntilConditionIsMetAndRetryNTimesOnError = (
  request: CallableFunction,
  condition: CallableFunction,
  max_retry = 2,
  delay = 100
) => {
  let retried = 0;
  let last_error: AxiosError;
  const delayedRequest = async (...args: GenericObj[]): Promise<GenericObj> =>
    new Promise((resolve, reject) =>
      setTimeout(async () => {
        if (condition()) resolve(await delayedRequest(...args));
        else {
          try {
            if (retried < max_retry) {
              retried += 1;
              resolve(await request(...args));
            } else {
              reject(last_error);
            }
          } catch (e) {
            last_error = e;
            resolve(await delayedRequest(...args));
          }
        }
      }, delay)
    );
  return delayedRequest;
};
