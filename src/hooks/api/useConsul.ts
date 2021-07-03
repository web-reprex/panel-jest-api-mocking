import { ConsulPublicConfig, getConsulPublicConfig } from 'src/api/consul';
import { useQuery } from 'src/hooks/api/customQueries';

export const findConsulConfig = (): ConsulPublicConfig | null => {
  const consul = localStorage.getItem('consul');
  return consul ? JSON.parse(consul) : null;
};

export const setConsulConfig = (consul: ConsulPublicConfig) =>
  localStorage.setItem('consul', JSON.stringify(consul));

export const removeConsulConfig = () => localStorage.removeItem('consul');

export const useConsulPublicConfig = () =>
  useQuery(
    'consulPublicConfig',
    async () => {
      const consul = await getConsulPublicConfig();
      setConsulConfig(consul);
      return consul;
    },
    { refetchOnWindowFocus: false }
  );
