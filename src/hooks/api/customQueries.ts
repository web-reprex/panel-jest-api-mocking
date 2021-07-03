import {
  useQuery as useQueryRoot,
  QueryKey,
  UseQueryOptions
} from 'react-query';
import clog from 'src/utils/cuteLog';

export const useQuery = <T>(
  key: QueryKey,
  queryFn: () => Promise<T>,
  options: UseQueryOptions = {},
  onErrorNotification = true,
  onSuccessNotification = true
) => {
  const { onSuccess, onError } = options;
  options = {
    ...options,
    onSuccess: response => {
      if (onSuccess instanceof Function) onSuccess(response);
      if (onSuccessNotification)
        clog('onSuccessNotification', 'info', response)();
    },
    onError: error => {
      if (onError instanceof Function) onError(error);
      if (onErrorNotification) clog('onErrorNotification', 'danger', error)();
    }
  };
  /*eslint-disable*/
  //@ts-ignore
  return useQueryRoot<T, unknown, T, QueryKey>(key, queryFn, options);
};
