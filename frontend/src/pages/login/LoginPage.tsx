import styles from './Login.module.css';
import { LoginInput } from '../../interfaces/User';
import { Link } from 'react-router-dom';
import { AppName } from '../../components/AppName';
import { HsyLogo } from '../../components/HsyLogo';
import useAuth from '../../hooks/AuthHook';
import { ButtonLoading } from '../../components/ButtonLoading';
import { useForm } from 'react-hook-form';
import { FormFieldError } from '../../components/FormFieldError';
import CustomError from '../../interfaces/CustomError';

const LoginPage = () => {
  const { loginUser } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInput>();

  const onSubmit = async (data: LoginInput) => {
    const res = await loginUser(data);

    if (res instanceof CustomError) {
      const message =
        res.status === 401
          ? 'Sähköposti tai salasana on virheellinen'
          : 'Palvelinvirhe';
      setError('root.serverError', {
        message: message,
      });
    }
  };

  return (
    <div className={styles.container}>
      <AppName />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
        <label className="loginlabel">
          <input
            className="inputlogin"
            type="email"
            {...register('email', { required: 'Sähköposti vaaditaan' })}
            placeholder="Sähköposti"
          />
          <FormFieldError error={errors.email} />
        </label>

        <label className="loginlabel">
          <input
            className="inputlogin"
            type="password"
            placeholder="Salasana"
            {...register('password', { required: 'Salasana vaaditaan' })}
          />
          <FormFieldError error={errors.password} />
        </label>
        {errors.root?.serverError && (
          <FormFieldError error={errors.root?.serverError} />
        )}
        <ButtonLoading text="Kirjaudu sisään" classname={styles.button} />
      </form>
      <Link to="/" className="homebutton">
        Home
      </Link>
      <HsyLogo />
    </div>
  );
};

export default LoginPage;
