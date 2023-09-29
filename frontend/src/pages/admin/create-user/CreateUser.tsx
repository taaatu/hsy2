import { useState } from 'react';
import { CITIES } from '../../../variables/Constants';
import { User } from '../../../interfaces/User';
import { useUser } from '../../../hooks/UserHook';

export const CreateUser = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const { addUser } = useUser();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser: User = {
      full_name: name,
      email: email,
      password: password,
      company: companyName,
    };
    const res = await addUser(newUser);
    console.log('add user: ', res);
    if (!res || !res.id) return;
    alert('Käyttäjä lisätty');
  };
  return (
    <div className="centered-container">
      <h1>Lisää isännöitsijä</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Isännöitsijän nimi
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Yrityksen nimi
          <input onChange={(e) => setCompanyName(e.target.value)} />
        </label>
        <label>
          Sähköposti
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Salasana
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Lisää isännöitsijä</button>
      </form>
    </div>
  );
};
