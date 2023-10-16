import { useForm } from 'react-hook-form';
import { User } from '../../interfaces/User';
import { PASSWORD_REGEX } from '../../variables/Constants';
import { FormFieldError } from '../FormFieldError';
import { useUser } from '../../hooks/UserHook';

type Props = {
  user: User;
  setIsModifying: (value: boolean) => void;
};

export const ModifyUserForm = ({ user, setIsModifying }: Props) => {
  const { modifyUser } = useUser();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<User>({ defaultValues: user });

  const onSubmit = async (data: User) => {
    console.log('modify user data:', data);
    const res = await modifyUser(data);
    if (!res) {
      setError('root.serverError', {
        message: 'Muokkaus epäonnistui',
      });
      return;
    }
    setIsModifying(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Nimi
        <input
          type="text"
          {...register('full_name', { required: 'Nimi vaaditaan' })}
        />
        <FormFieldError error={errors.full_name} />
      </label>
      <label>
        Sähköposti
        <input
          required
          type="email"
          {...register('email', { required: 'Sähköposti vaaditaan' })}
        />
        <FormFieldError error={errors.email} />
      </label>
      <label>
        Yritys
        <input {...register('company', { required: 'Yritys vaaditaan' })} />
        <FormFieldError error={errors.company} />
      </label>
      <label>
        Salasana
        <input
          required
          type="password"
          {...register('password', {
            required: 'Salasana vaaditaan',
            pattern: {
              value: PASSWORD_REGEX,
              message:
                'Salasanan tulee olla vähintään 8 merkkiä pitkä ja sisältää vähintään yhden numeron',
            },
          })}
        />
        <FormFieldError error={errors.password} />
      </label>
      {errors.root?.serverError && (
        <FormFieldError error={errors.root?.serverError} />
      )}
      <button>Tallenna</button>
    </form>
  );
};
