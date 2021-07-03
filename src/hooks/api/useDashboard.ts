import { getDashboard } from 'src/api/dashboard';
import { useQuery } from 'src/hooks/api/customQueries';

export const useDashboard = () => useQuery('dashboard', getDashboard);
