import { getItem } from 'src/api/service';

export const getDashboard = async () => {
  const { data } = await getItem(`panel/dashboard`);
  return data as any;
};
