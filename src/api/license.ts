import { getItem } from 'src/api/service';

export interface LicenseResponse {
  activationCode: string;
  hardwareId: string;
  licenseKey: string;
}

export const getLicense = async (page = 'init') => {
  const { data } = await getItem(page + '/license');
  return data as LicenseResponse;
};
