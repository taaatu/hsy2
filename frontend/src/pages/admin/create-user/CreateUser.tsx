import { CITIES } from '../../../variables/Constants';

export const CreateUser = () => {
  return (
    <div className="centered-container">
      <h1>CreateUser</h1>
      <form>
        <label>
          Sähtköposti
          <input type="email" placeholder="Sähköposti" />
        </label>
        <label>
          Salasana
          <input type="password" placeholder="Salasana" />
        </label>

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

        <button>Lisää isännöitsijä</button>
      </form>
    </div>
  );
};
