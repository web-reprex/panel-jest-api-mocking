import service from 'src/api/service';
import { TokenType, TokenScope } from 'src/api/service/types';

export interface JwtResponseToken {
  access_token: string;
  expires_in: number;
  jti: string;
  refresh_token: string;
  token_type: TokenType;
  scope?: TokenScope;
  user_id?: number;
  id_token?: string;
  resource?: string;
  refresh_token_expires_in?: number;
}

export const setApiTokenAuthHeader = (token: JwtResponseToken | null) =>
  (service.defaults.headers.common['Authorization'] = token
    ? `${token.token_type} ${token.access_token}`
    : undefined);

export * from './regular';
export * from './sso';
