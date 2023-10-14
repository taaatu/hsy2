import { useState } from 'react';
import { CITIES } from '../../../variables/Constants';
import { Property } from '../../../interfaces/Property';
import useProperty from '../../../hooks/PropertyHook';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormFieldError } from '../../../components/FormFieldError';

export const AddProperty = () => {
  const { addProperty } = useProperty();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Property>({
    defaultValues: { city: CITIES[0] },
  });

  const onSubmit: SubmitHandler<Property> = async (data) => addProperty(data);

  return (
    <div className="centered-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4>Taloyhtiö</h4>
        <label>
          Osoite
          <input
            placeholder="Osoite"
            {...register('address', { required: 'Osoite vaaditaan' })}
          />
          <FormFieldError error={errors.address} />
        </label>
        <label>
          Postinumero
          <input
            placeholder="Postinumero"
            {...register('postcode', {
              required: 'Postinumero vaaditaan',
            })}
          />
          <FormFieldError error={errors.postcode} />
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

        <button>Lisää taloyhtiö</button>
      </form>
    </div>
  );
};
