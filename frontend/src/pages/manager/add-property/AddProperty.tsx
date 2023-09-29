import { CITIES } from '../../../variables/Constants';

export const AddProperty = () => {
  return (
    <div className="centered-container">
      <form>
        <h4>Taloyhtiö</h4>
        <label>
          Osoite
          <input placeholder="Osoite" />
        </label>
        <label>
          Postinumero
          <input placeholder="Postinumero" />
        </label>

        <label>
          Kaupunki
          <select>
            {CITIES.map((city: string) => (
              <option key={city}>{city}</option>
            ))}
          </select>
        </label>

        <label>
          Taloyhtiön nimi
          <input placeholder="Taloyhtiön nimi" />
        </label>

        <button>Lisää taloyhtiö</button>
      </form>
    </div>
  );
};
