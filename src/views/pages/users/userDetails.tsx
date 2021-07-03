import { useGetUser } from 'src/hooks/api/useUser';

export const UserDetails = ({ id }: { id: string }) => {
  const { data: user, isLoading } = useGetUser(id);
  if (isLoading) return <div>Load user{id} Data </div>;
  return (
    <div style={{ margin: '10px', backgroundColor: 'var(--success)' }}>
      id:{user?.id}
      <br />
      Name:{user?.name}
      <br />
      Email:{user?.email}
      <br />
    </div>
  );
};
