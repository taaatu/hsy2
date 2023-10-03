import { FormEvent, useState } from 'react';
import styles from './Login.module.css';
import { LoginInput, UserGroup } from '../../interfaces/User';
import { Link, useNavigate } from 'react-router-dom';
import { AppName } from '../../components/AppName';
import { HsyLogo } from '../../components/HsyLogo';
import useAuth from '../../hooks/AuthHook';
import { ADMIN_HOME, MANAGER_HOME } from '../../variables/RoutePaths';

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
    const res = await loginUser(loginInput);
    if (!res) {
      alert('Kirjautuminen epäonnistui');
      return;
    }
    localStorage.setItem('token', res.token);
    res.user.user_group === UserGroup.ADMIN
      ? navigate(ADMIN_HOME)
      : navigate(MANAGER_HOME);
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
