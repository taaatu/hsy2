import { FormEvent, useState } from 'react';
import styles from './Login.module.css';
import { LoginInput, UserGroup } from '../../interfaces/User';
import { Link, useNavigate } from 'react-router-dom';
import { AppName } from '../../components/AppName';
import { HsyLogo } from '../../components/HsyLogo';
import useAuth from '../../hooks/AuthHook';
import { ButtonLoading } from '../../components/ButtonLoading';

export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginInput: LoginInput = {
      email: email,
      password: password,
    };
    console.log('loginInput: ', loginInput);
    await loginUser(loginInput);
  };

  return (
    <div className={styles.container}>
      <AppName />
      <form onSubmit={handleSumbit} className="loginforms">
        <label className="loginlabel">
          Sähköposti
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="loginlabel">
          Salasana{' '}
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <ButtonLoading text="Kirjaudu sisään" />
      </form>
      <Link to="/" className="homebutton">
        Home
      </Link>
      <HsyLogo />
    </div>
  );
};

export default Login;
