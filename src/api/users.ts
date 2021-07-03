import { User } from 'src/mocks/db/mockUsers';
import { getItem, postItem } from './service';

export const getUsers = async () => {
  const { data } = await getItem(`/users`);
  return data as User[];
};
export const getUserById = async (id: string) => {
  const { data } = await getItem(`/users/${id}`);
  return data as User;
};

export const createUser = (newUser: User) => postItem(`/users`, newUser);
