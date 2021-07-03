import { setupServer } from 'msw/node';
// This configures a request mocking server with the given request handlers.
/*
 * Dynamic Auto generated rest api handlers
The following request handlers are generated and connected to the respective database operations:
* GET /users
 returns all users (supports pagination).
* GET /users/:id
 (where "id" is your model's primary key), returns a user by primary key.
* POST /users
 creates a new user.
* PUT /users/:id
 updates an existing user by primary key.
* DELETE /users/:id
 deletes an existing user by primary key.
 */
import { dbUsers } from './db/mockUsers';
import { urls } from 'src/api/constants';
import { loginHandlers } from './handlers';

export const server = setupServer(
  ...dbUsers.user.toHandlers('rest', `${urls.base}`),
  ...loginHandlers
);
