import { endpoints, urls } from 'src/api/constants';
import { getItem } from 'src/api/service';

export interface ConsulServiceOptions {
  hostname: string;
  httpBasePath: string;
  protocol: string;
  port: number;
  xmppTLS?: boolean;
  compression?: boolean;
  options?: { [index: string]: any };
  _desc?: string;
}
export interface IamServiceConfig extends ConsulServiceOptions {
  options: {
    authorizePath: string;
    tokenPath: string;
  };
}
export interface ConsulPublicConfig {
  services: {
    iam: IamServiceConfig;
  };
  configs: {
    initialized: boolean;
  };
}

export const getConsulPublicConfig = async () => {
  const { data } = await getItem(
    `${urls.base}/${endpoints.publicPlatformConfig}`
  );
  return data as ConsulPublicConfig;
};
