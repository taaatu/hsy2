import { CITIES } from '../../../variables/Constants';
import { Building } from '../../../interfaces/Building';
import useBuilding from '../../../hooks/BuildingHook';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormFieldError } from '../../../components/FormFieldError';

export const AddBuilding = () => {
  const { addBuilding } = useBuilding();

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
    if (!res) {
      setError('root.serverError', {
        message: 'Taloyhtiön lisäys epäonnistui',
      });
      return;
    }
  };

  return (
    <div className="centered-container">
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
