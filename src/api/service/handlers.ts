import { AxiosError, AxiosRequestConfig } from 'axios';
import { GenericObj } from 'src/types/index';
import i18n from 'src/locales';
import clog from 'src/utils/cuteLog';

const addDefaultHeader = (headers: GenericObj, lang = 'en-us') => ({
  ...headers,
  'Accept-Language': lang
});

// Axios onRequestFulfilled
export const onRequestFulfilled = (config: AxiosRequestConfig) => {
  config.headers = addDefaultHeader(config.headers);
  return config;
};

// Error Handlers
const regularHttpErrorHandler = (error: AxiosError) => {
  const err_res = error.response!;
  const status = err_res.status || 0;
  const message = err_res.data
    ? err_res.data.error_description ||
      err_res.data.message ||
      err_res.statusText
    : '';
  switch (status) {
    // case 510:
    // router.push("/init");
    // break;
    case 401:
      // api_logout();
      break;
    case 403: // router.push("/license");    // break;
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
    case 505: // router.push("/err500");    // break;
    case 400:
    case 415:
    default:
      // store.commit('setLoading', false);
      break;
  }
  return message;
};
export const defaultErrorMessage = (lang = 'en-us') =>
  i18n.t(`data.errorPages.${lang}`);
const otherErrorHandler = (error: AxiosError, lang = 'en-us') => {
  const isNetworkError = (msg: string) => (error.message ? error.message : msg);
  return isNetworkError(defaultErrorMessage(lang));
};

// Axios onResponseRejected
export const onResponseRejected = async (error: AxiosError) => {
  const err_res = error.response;
  const message = err_res
    ? regularHttpErrorHandler(error)
    : otherErrorHandler(error);
  clog('onResponseRejected', 'danger', message)();
  // showErrorToast(message || defaultErrorMessage());
  return error;
};
