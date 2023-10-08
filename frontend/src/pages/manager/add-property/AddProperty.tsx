import { useState } from 'react';
import { CITIES } from '../../../variables/Constants';
import { Property } from '../../../interfaces/Property';
import useProperty from '../../../hooks/PropertyHook';

export const AddProperty = () => {
  const { addProperty } = useProperty();
  const [property, setProperty] = useState<Partial<Property>>({
    city: CITIES[0],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProperty({
      ...property,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addProperty(property as Property);
  };

  return (
    <div className="centered-container">
      <form onSubmit={handleSubmit}>
        <h4>Taloyhtiö</h4>
        <label>
          Osoite
          <input
            required
            placeholder="Osoite"
            name="address"
            onChange={handleChange}
          />
        </label>
        <label>
          Postinumero
          <input
            placeholder="Postinumero"
            required
            name="postcode"
            onChange={handleChange}
          />
        </label>

        <label>
          Kaupunki
          <select
            name="city"
            required
            onChange={handleChange}
            defaultValue={property.city}
          >
            {CITIES.map((city: string) => (
              <option key={city}>{city}</option>
            ))}
          </select>
        </label>

        <label>
          Taloyhtiön nimi
          <input
            required
            placeholder="Taloyhtiön nimi"
            name="name"
            onChange={handleChange}
          />
        </label>

        <button>Lisää taloyhtiö</button>
      </form>
    </div>
  );
};
