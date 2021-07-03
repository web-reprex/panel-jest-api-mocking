export enum TokenScope {
  read = 'read',
  write = 'write',
  admin = 'admin',
  any = 'any'
}
export enum ResponseType {
  code = 'code'
}
export enum TokenType {
  bearer = 'bearer',
  basic = 'basic'
}
export interface OAuthToken {
  access_token: string;
  expires_in: number;
  id_token?: string;
  jti: string;
  refresh_token_expires_in?: number;
  refresh_token: string;
  resource?: string;
  scope: string;
  token_type: string;
}
export interface Pagination {
  page: number;
  size: number;
  total?: number;
}
