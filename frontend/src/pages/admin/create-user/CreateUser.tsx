import { useState } from 'react';
import { CITIES, PASSWORD_REGEX } from '../../../variables/Constants';
import { User } from '../../../interfaces/User';
import { useUser } from '../../../hooks/UserHook';
import { ButtonLoading } from '../../../components/ButtonLoading';

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
    if (!res) {
      alert('Käyttäjän lisäys epäonnistui');
      return;
    }
    alert('Käyttäjä lisätty');
  };
  return (
    <div className="centered-container">
      <h1>Lisää isännöitsijä</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Isännöitsijän nimi
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Yrityksen nimi
          <input required onChange={(e) => setCompanyName(e.target.value)} />
        </label>
        <label>
          Sähköposti
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Salasana
          <input
            type="password"
            pattern={PASSWORD_REGEX}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <ButtonLoading text="Lisää isännöitsijä" />
      </form>
    </div>
  );
};
