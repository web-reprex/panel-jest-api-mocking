import { setupWorker } from 'msw';

// for browser environments
/*
 * Manual handlers
 */
// import { handlers } from './handlers';
// export const worker = setupWorker(...handlers);

/*
 * Dynamic Auto generated rest api handlers
 */
import { dbUsers } from './db/mockUsers';
import { urls } from 'src/api/constants';
export const worker = setupWorker(
  ...dbUsers.user.toHandlers('rest', `${urls.base}`)
);
