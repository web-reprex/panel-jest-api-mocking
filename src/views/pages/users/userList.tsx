import { useGetAllUsers } from 'src/hooks/api/useUser';
import { User } from 'src/mocks/db/mockUsers';

export const UserList = ({ selectUser }: { selectUser: CallableFunction }) => {
  const { data: users, isLoading, isError } = useGetAllUsers();
  if (isLoading) return <h2>Loading Users...</h2>;
  if (!users || isError)
    return <div>There is some error in Fetching Users</div>;

  return (
    <ul>
      {users.map((user: User) => (
        <li
          style={{ margin: '5px', cursor: 'pointer', color: 'var(--primary)' }}
          key={user.id}
          onClick={() => selectUser(user.id)}
        >
          {user.name}
        </li>
      ))}
    </ul>
  );
};
