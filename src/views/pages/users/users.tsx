import { useState } from 'react';
import clog from 'src/utils/cuteLog';
import { CreateUser } from './createUser';
import { UserDetails } from './userDetails';
import { UserList } from './userList';

export const Users = () => {
  clog('Users Component Rendering', 'info')();
  const [id, setId] = useState('');

  return (
    <>
      <CreateUser />
      <UserList selectUser={setId} />
      {id ? <UserDetails id={id} /> : null}
    </>
  );
};
