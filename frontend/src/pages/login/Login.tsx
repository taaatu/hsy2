import { FormEvent, useState } from 'react';
import styles from './Login.module.css';
import { LoginInput } from '../../interfaces/User';
import { Link } from 'react-router-dom';
import { AppName } from '../../components/AppName';
import { HsyLogo } from '../../components/HsyLogo';

export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginInput: LoginInput = {
      email: email,
      password: password,
    };
    // TODO: Login API call
    console.log('loginInput: ', loginInput);
  };

  return (
    <div className={styles.container}>
      <AppName />
      <form onSubmit={handleSumbit}>
        <label>
          Sähköposti
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Salasana{' '}
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button>Kirjaudu sisään</button>
      </form>
      <Link to="/">Home</Link>
      <HsyLogo />
    </div>
  );
};

export default Login;
