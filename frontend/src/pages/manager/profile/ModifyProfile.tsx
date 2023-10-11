import { useState } from 'react';
import { User } from '../../../interfaces/User';
import { ButtonLoading } from '../../../components/ButtonLoading';
import { useUser } from '../../../hooks/UserHook';

type Props = {
  user: User;
  setIsModifying: (isModifying: boolean) => void;
};

export const ModifyProfile = ({ user, setIsModifying }: Props) => {
  const [newUser, setNewUser] = useState<User>(user);
  const { modifyUser } = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    modifyUser(newUser);
    setIsModifying(false);
    console.log('new user: ', newUser);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nimi
        <input
          name="full_name"
          defaultValue={user.full_name}
          type="text"
          required
          onChange={handleChange}
        />
      </label>
      <label>
        Sähköposti
        <input
          name="email"
          defaultValue={user.email}
          type="email"
          required
          onChange={handleChange}
        />
      </label>
      <label>
        Yritys
        <input
          name="company"
          defaultValue={user.company}
          type="text"
          required
          onChange={handleChange}
        />
      </label>
      <label>
        Salasana
        <input
          defaultValue={user.password}
          name="password"
          type="password"
          placeholder="Salasana"
          onChange={handleChange}
        />
      </label>

      <ButtonLoading text="Tallenna" />
    </form>
  );
};
