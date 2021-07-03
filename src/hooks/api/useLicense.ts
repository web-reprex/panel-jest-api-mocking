import { getLicense } from 'src/api/license';
import { useQuery } from 'src/hooks/api/customQueries';

export const useLicense = (page = 'init') =>
  useQuery('license', () => getLicense(page), { refetchOnWindowFocus: false });
