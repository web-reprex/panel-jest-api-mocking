import { factory, primaryKey } from '@mswjs/data';
export interface User {
  id: string;
  name: string;
  email: string;
}
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alice',
    email: 'alice@aol.com'
  },
  {
    id: '2',
    name: 'Bob',
    email: 'bob@aol.com'
  },
  {
    id: '3',
    name: 'Dennis',
    email: 'dennis@aol.com'
  }
];
export const dbUsers = factory({
  //create a "user" model
  user: {
    id: primaryKey(String),
    name: String,
    email: String
  }
});

mockUsers.forEach(user => dbUsers.user.create(user));
