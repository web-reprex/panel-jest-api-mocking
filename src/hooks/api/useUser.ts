import { useMutation, useQueryClient } from 'react-query';
import { getUsers, getUserById, createUser } from 'src/api/users';
import { User } from 'src/mocks/db/mockUsers';
import { useQuery } from './customQueries';

export const useGetAllUsers = () => {
  return useQuery('users', getUsers);
};
export const useGetUser = (id: string) => {
  return useQuery(['user', id], () => getUserById(id));
};

export const useAddNewUser = () => {
  const queryClient = useQueryClient();
  return useMutation((newUser: User) => createUser(newUser), {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    }
  });
};
