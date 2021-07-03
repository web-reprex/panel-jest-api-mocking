import axios from 'axios';
import { Pagination } from './types';
import { GenericObj } from './../../types/index';
import * as interceptors from './interceptors';
import { apiConstants } from 'src/api/constants';
import { objectToUriParams, apiConfig } from './utils';

/*
 * Create & Config Axios Instance Using Interceptors
 */
const service = axios.create({
  // baseURL: urls.base
  // timeout: 10000
});
service.interceptors.request.use(
  interceptors.onRequestFulfilled,
  interceptors.onRequestRejected
);
service.interceptors.response.use(
  interceptors.onResponseFulfilled,
  interceptors.onResponseRejected
);

const URL_PREFIX = apiConstants.apiPrefix;
/*
 * Get Services
 */
const getItem = (url: string, urlPrefix = URL_PREFIX) =>
  service(apiConfig('get', url, urlPrefix));

const getItems = (
  url: string,
  pagination: Pagination = { page: 1, size: 15 },
  sort_label = ''
) => getItem(url + '?' + objectToUriParams(pagination) + sort_label);

/*
 * Post Service
 */
const postItem = (url: string, data: GenericObj = {}, urlPrefix = URL_PREFIX) =>
  service(apiConfig('post', url, urlPrefix, data));

/*
 * Delete Service
 */
const deleteItem = (url: string, data = {}, urlPrefix = URL_PREFIX) =>
  service(apiConfig('delete', url, urlPrefix, data));

/*
 * Put Service
 */
const putItem = (
  url: string,
  data: GenericObj = {},
  headers?: GenericObj,
  urlPrefix = URL_PREFIX
) => service({ ...apiConfig('put', url, urlPrefix, data), headers });

export { getItem, getItems, postItem, putItem, deleteItem };
export default service;
