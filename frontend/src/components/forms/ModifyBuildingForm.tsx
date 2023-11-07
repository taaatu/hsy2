import { useForm } from 'react-hook-form';
import { Building } from '../../interfaces/Building';
import { useState } from 'react';
import { CITIES, POST_CODE_REGEX } from '../../variables/Constants';
import { FormFieldError } from '../FormFieldError';
import useBuilding from '../../hooks/BuildingHook';
import CustomError from '../../interfaces/CustomError';
import { SuccessAlertModal } from '../SuccessAlertModal';
import { useNavigate } from 'react-router-dom';

type Props = {
  building: Building;
};

export const ModifyBuildingForm = ({ building }: Props) => {
  const [isModifying, setIsModifying] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const { modifyBuilding, deleteBuilding } = useBuilding();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<Building>({ defaultValues: building });

  const handleDelete = async () => {
    const res = await deleteBuilding(String(building.building_id));
    if (res instanceof CustomError) {
      setError('root', {
        type: 'serverError',
        message: 'Taloyhtiön poistaminen epäonnistui',
      });
      return;
    }
    navigate('/manager/properties');
  };

  const onSubmit = async (data: Building) => {
    console.log('modify building data:', data);
    const res = await modifyBuilding(data);
    if (res instanceof CustomError) {
      const message =
        res.status === 409 ? 'Taloyhtiö on jo olemassa' : 'Palvelinvirhe';
      setError('root', {
        type: 'serverError',
        message: message,
      });
      return;
    }
    setShowSuccessModal(true);
    setIsModifying(false);
  };

  return (
    <form className="color3 column" onSubmit={handleSubmit(onSubmit)}>
      <SuccessAlertModal
        show={showSuccessModal}
        message="Taloyhtiön tiedot muokattu"
      />
      <label>
        Osoite
        <input
          className="line"
          {...register('street', {
            required: {
              value: true,
              message: 'Osoite vaaditaan',
            },
            disabled: !isModifying,
          })}
        />
        <FormFieldError error={errors.street} />
      </label>
      <label>
        Postinumero
        <input
          className="line"
          {...register('post_code', {
            required: {
              value: true,
              message: 'Postinumero vaaditaan',
            },
            pattern: {
              value: POST_CODE_REGEX,
              message: 'Postinumeron tulee olla 5 numeroa pitkä',
            },
            disabled: !isModifying,
          })}
        />
        <FormFieldError error={errors.post_code} />
      </label>

      <label>
        Kaupunki
        <select
          {...register('city', { required: true, disabled: !isModifying })}
        >
          {CITIES.map((city: string) => (
            <option key={city}>{city}</option>
          ))}
        </select>
      </label>
      <label>
        Nimi
        <input
          className="line"
          {...register('name', {
            required: {
              value: true,
              message: 'Nimi vaaditaan',
            },
            disabled: !isModifying,
          })}
        />
        <FormFieldError error={errors.name} />
      </label>
      {errors.root?.serverError && (
        <FormFieldError error={errors.root?.serverError} />
      )}
      <div className="flex-row">
        {isModifying ? (
          <>
            <button
              type="button"
              onClick={() => {
                setIsModifying(false);
                reset();
              }}
            >
              Poistu
            </button>
            <button type="submit">Tallenna</button>{' '}
          </>
        ) : (
          <button type="button" onClick={() => setIsModifying(true)}>
            Muokkaa
          </button>
        )}
        <button
          type="button"
          style={{ marginLeft: 'auto' }}
          className="delete"
          onClick={handleDelete}
        >
          Poista
        </button>
      </div>
    </form>
  );
};
