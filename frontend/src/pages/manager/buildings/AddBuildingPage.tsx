import { CITIES, POST_CODE_REGEX } from '../../../variables/Constants';
import { Building } from '../../../interfaces/Building';
import useBuilding from '../../../hooks/BuildingHook';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormFieldError } from '../../../components/FormFieldError';
import CustomError from '../../../interfaces/CustomError';
import { SuccessAlertModal } from '../../../components/SuccessAlertModal';
import { useState } from 'react';

const AddBuildingPage = () => {
  const { addBuilding } = useBuilding();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Building>({
    defaultValues: { city: CITIES[0] },
  });

  const onSubmit: SubmitHandler<Building> = async (data) => {
    const res = await addBuilding(data);
    if (res instanceof CustomError) {
      const message =
        res.status === 409
          ? 'Taloyhtiö tällä osoitteella tai nimellä on jo olemassa'
          : 'Palvelinvirhe';
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
        message="Taloyhtiö lisätty onnistuneesti"
        navRoute="/manager/properties"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4>Taloyhtiö</h4>
        <label>
          Osoite
          <input
            placeholder="Osoite"
            {...register('street', { required: 'Osoite vaaditaan' })}
          />
          <FormFieldError error={errors.street} />
        </label>
        <label>
          Postinumero
          <input
            placeholder="Postinumero"
            {...register('post_code', {
              required: 'Postinumero vaaditaan',
              pattern: {
                value: POST_CODE_REGEX,
                message: 'Postinumeron tulee olla 5 numeroa',
              },
            })}
          />
          <FormFieldError error={errors.post_code} />
        </label>

        <label>
          Kaupunki
          <select {...register('city', { required: true })}>
            {CITIES.map((city: string) => (
              <option key={city}>{city}</option>
            ))}
          </select>
        </label>

        <label>
          Taloyhtiön nimi
          <input
            {...register('name', { required: 'Nimi vaaditaan' })}
            placeholder="Taloyhtiön nimi"
          />
          <FormFieldError error={errors.name} />
        </label>
        {errors.root?.serverError && (
          <FormFieldError error={errors.root?.serverError} />
        )}
        <button>Lisää taloyhtiö</button>
      </form>
    </div>
  );
};

export default AddBuildingPage;
