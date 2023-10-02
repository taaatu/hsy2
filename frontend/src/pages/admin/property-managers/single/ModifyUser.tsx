import { useState } from 'react';
import { User } from '../../../../interfaces/User';
import { useUser } from '../../../../hooks/UserHook';

type ModifyUserProps = {
  user: User;
  setIsModifying: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModifyUser = ({ user, setIsModifying }: ModifyUserProps) => {
  const [name, setName] = useState<string>(user.full_name);
  const [email, setEmail] = useState<string>(user.email);
  const [company, setCompany] = useState<string>(user.company);
  const [password, setPassword] = useState<string>(user.password);
  const { modifyUser } = useUser();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModifying(false);
    const modifiedUser: Partial<User> = {
      user_id: user.user_id,
      full_name: name,
      email: email,
      company: company,
      password: password,
    };
    const res = await modifyUser(modifiedUser as User);
    if (!res) {
      alert('Käyttäjän muokkaus epäonnistui');
      return;
    }
    alert('Käyttäjä muokattu');
    console.log('Modify user response: ', res);
    console.log('Modified user: ', modifiedUser);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Nimi
          <input
            type="text"
            defaultValue={user.full_name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Sähköposti
          <input
            type="email"
            defaultValue={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Yritys
          <input
            type="text"
            defaultValue={user.company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>
        <label>
          Salasana
          <input
            type="password"
            defaultValue={user.password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Tallenna</button>
      </form>
    </div>
  );
};
