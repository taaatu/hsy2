import styles from './Login.module.css';

const Login = () => {
  return (
    <div>
      <h1>HIMA</h1>
      <form>
        <label>
          Sähköposti
          <input type="email" placeholder="Email" required />
        </label>

        <label>
          Salasana <input type="password" placeholder="Password" required />
        </label>

        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
