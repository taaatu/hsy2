import { PASSWORD_REGEX } from '../../../variables/Constants';
import { User } from '../../../interfaces/User';
import { useUser } from '../../../hooks/UserHook';
import { ButtonLoading } from '../../../components/ButtonLoading';
import { useForm } from 'react-hook-form';
import { FormFieldError } from '../../../components/FormFieldError';
import CustomError from '../../../interfaces/CustomError';
import { SuccessAlertModal } from '../../../components/SuccessAlertModal';
import { useState } from 'react';

export const CreateUser = () => {
  const { addUser } = useUser();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = async (data: User) => {
    console.log('data: ', data);
    const res = await addUser(data);
    if (res instanceof CustomError) {
      const message =
        res.status === 409 ? 'Sähköposti on jo käytössä' : 'Palvelinvirhe';
      setError('root.serverError', {
        message: message,
      });
      return;
    }
    setShowSuccessModal(true);
  };

  return (
    <div className="centered-container">
      <SuccessAlertModal
        show={showSuccessModal}
        message="Isännöitsijä lisätty onnistuneesti"
        navRoute="/admin/managers"
      />
      <h1>Lisää isännöitsijä</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Isännöitsijän nimi
          <input
            type="text"
            {...register('full_name', { required: 'Nimi vaaditaan' })}
          />
          <FormFieldError error={errors.full_name} />
        </label>
        <label>
          Yrityksen nimi
          <input
            {...register('company', { required: 'Yrityksen nimi vaaditaan' })}
          />
          <FormFieldError error={errors.company} />
        </label>
        <label>
          Sähköposti
          <input
            type="email"
            {...register('email', { required: 'Sähköposti vaaditaan' })}
          />
          <FormFieldError error={errors.email} />
        </label>
        <label>
          Salasana
          <input
            type="password"
            {...register('password', {
              required: 'Salasana vaaditaan',
              pattern: {
                value: PASSWORD_REGEX,
                message:
                  'Salasanan tulee olla vähintään 8 merkkiä pitkä ja sisältää vähintään yksi numero, yksi erikoismerkki ja yksi iso kirjain',
              },
            })}
          />
          <FormFieldError error={errors.password} />
        </label>
        {errors.root?.serverError && (
          <FormFieldError error={errors.root?.serverError} />
        )}
        <ButtonLoading text="Lisää isännöitsijä" />
      </form>
    </div>
  );
};
