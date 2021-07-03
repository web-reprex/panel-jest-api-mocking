import { TextField } from '@material-ui/core';
import { useState } from 'react';
import { useAddNewUser } from 'src/hooks/api/useUser';
import { Button } from 'src/views/components/button/button';

export const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { mutate: addNewUser } = useAddNewUser();
  return (
    <div>
      <TextField
        label="Name"
        name="name"
        id="name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <TextField
        label="Email"
        name="email"
        id="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Button
        onClick={() => addNewUser({ id: Date.now().toString(), name, email })}
      >
        Create New User
      </Button>
    </div>
  );
};
