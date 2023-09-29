import { useState } from 'react';
import { CITIES } from '../../../variables/Constants';
import { User } from '../../../interfaces/User';

export const CreateUser = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const newUser: User = {
      full_name: name,
      email: email,
      password: password,
      company: companyName,
    };
    alert('submit');
    console.log('newUser: ', newUser);
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
