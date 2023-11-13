import { useForm } from 'react-hook-form';
import { User } from '../../interfaces/User';
import { PASSWORD_REGEX } from '../../variables/Constants';
import { FormFieldError } from '../FormFieldError';
import { useUser } from '../../hooks/UserHook';
import { ButtonLoading } from '../ButtonLoading';
import { useState } from 'react';
import CustomError from '../../interfaces/CustomError';
import { SuccessAlertModal } from '../SuccessAlertModal';

type Props = {
  user: User;
  isAdmin?: boolean;
};

export const ModifyUserForm = ({ user, isAdmin = false }: Props) => {
  const { modifyUser, deleteUser, modifyUserByAdmin } = useUser();
  const [isModifying, setIsModifying] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<User>({ defaultValues: user });

  const onSubmit = async (data: User) => {
    console.log('modify user data:', data);
    const res = isAdmin
      ? await modifyUserByAdmin(data)
      : await modifyUser(data);
    if (res instanceof CustomError) {
      const message =
        res.status === 409 ? 'Sähköposti on jo käytössä' : 'Palvelinvirhe';
      setError('root.serverError', {
        message: message,
      });
      return;
    }
    setIsModifying(false);
    setShowSuccessModal(true);
  };

  const handleDelete = async () => {
    if (!user?.user_id) return;
    await deleteUser(user.user_id);
  };

  return (
    <>
      <SuccessAlertModal
        show={showSuccessModal}
        message="Käyttäjätiedot muokattu"
      />
      <form
        className="color3 column"
        style={{ margin: 'auto' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label>
          Nimi
          <input
            type="text"
            className="line"
            {...register('full_name', {
              required: 'Nimi vaaditaan',
              disabled: !isModifying,
            })}
          />
          <FormFieldError error={errors.full_name} />
        </label>
        <label>
          Sähköposti
          <input
            required
            type="email"
            className="line"
            {...register('email', {
              required: 'Sähköposti vaaditaan',
              disabled: !isModifying,
            })}
          />
          <FormFieldError error={errors.email} />
        </label>
        <label>
          Yritys
          <input
            className="line"
            {...register('company', {
              required: 'Yritys vaaditaan',
              disabled: !isModifying,
            })}
          />
          <FormFieldError error={errors.company} />
        </label>
        <label>
          Salasana
          <input
            required
            type="password"
            className="line"
            {...register('password', {
              required: 'Salasana vaaditaan',
              disabled: !isModifying,
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
        <div className="flex-row">
          {isModifying ? (
            <>
              <ButtonLoading text="Tallenna" />
              <button
                type="button"
                onClick={() => {
                  setIsModifying(false);
                  reset();
                }}
              >
                Poistu
              </button>
            </>
          ) : (
            <button onClick={() => setIsModifying(true)}>Muokkaa</button>
          )}
          <button
            type="button"
            className="delete"
            style={{ marginLeft: 'auto' }}
            onClick={handleDelete}
          >
            Poista käyttäjä
          </button>
        </div>
      </form>
    </>
  );
};
