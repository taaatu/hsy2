import styles from './Login.module.css';
import { LoginInput } from '../../interfaces/User';
import { Link } from 'react-router-dom';
import { AppName } from '../../components/AppName';
import { HsyLogo } from '../../components/HsyLogo';
import useAuth from '../../hooks/AuthHook';
import { ButtonLoading } from '../../components/ButtonLoading';
import { useForm } from 'react-hook-form';
import { FormFieldError } from '../../components/FormFieldError';

export const Login = () => {
  const { loginUser } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInput>();

  const onSubmit = async (data: LoginInput) => {
    const res = await loginUser(data);
    if (!res) {
      setError('root.serverError', {
        message: 'Sähköposti tai salasana on virheellinen',
      });
    }
  };

  return (
    <div className={styles.container}>
      <AppName />
      <form onSubmit={handleSubmit(onSubmit)} className="loginforms">
        <label className="loginlabel">
          Sähköposti
          <input
            type="email"
            {...register('email', { required: 'Sähköposti vaaditaan' })}
            placeholder="Email"
          />
          <FormFieldError error={errors.email} />
        </label>

        <label className="loginlabel">
          Salasana{' '}
          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: 'Salasana vaaditaan' })}
          />
          <FormFieldError error={errors.password} />
        </label>
        {errors.root?.serverError && (
          <FormFieldError error={errors.root?.serverError} />
        )}
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
