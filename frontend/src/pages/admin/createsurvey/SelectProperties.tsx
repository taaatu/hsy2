import { useState } from 'react';
import { CITIES } from '../../../variables/Constants';

enum SelectLevel {
  ALL = 'all',
  CITY = 'city',
  POSTAL_CODE = 'postal_code',
  NONE = 'none',
}
export const SelectProperties = () => {
  // const [isAll, setIsAll] = useState<boolean>(true);
  const [selectLevel, setSelectLevel] = useState<SelectLevel>(SelectLevel.ALL);
  return (
    <div>
      <h2>Valitse taloyhtiöt</h2>{' '}
      <div style={{ backgroundColor: 'white' }}>
        <label style={{ display: 'flex', flexDirection: 'row' }}>
          Kaikki
          <input
            // onChange={() => setIsAll(!isAll)}
            onChange={() =>
              setSelectLevel(
                selectLevel === SelectLevel.ALL
                  ? SelectLevel.NONE
                  : SelectLevel.ALL
              )
            }
            // checked={isAll}
            checked={selectLevel === SelectLevel.ALL}
            type="checkbox"
          />
        </label>
        {/* {isAll ? <div>Something</div> : <div>Something else</div>} */}
        {selectLevel !== SelectLevel.ALL && (
          <>
            <div>
              <SelectCity
                selectLevel={selectLevel}
                setSelectLevel={setSelectLevel}
              />
              <SelectPostalCode />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
type Props = {
  selectLevel: SelectLevel;
  setSelectLevel: (selectLevel: SelectLevel) => void;
};
const SelectCity = ({ selectLevel, setSelectLevel }: Props) => {
  // const [isSelected, setIsSelected] = useState<boolean>(false);
  const [city, setCity] = useState<string>('');
  return (
    <div>
      <label className="flex-row">
        Koko kaupunki
        <input
          type="checkbox"
          // onChange={() => setIsSelected(!isSelected)}
          checked={selectLevel === SelectLevel.CITY}
          onChange={() =>
            setSelectLevel(
              selectLevel === SelectLevel.CITY
                ? SelectLevel.NONE
                : SelectLevel.CITY
            )
          }
        />
      </label>
      {
        /*isSelected*/ selectLevel === SelectLevel.CITY && (
          <>
            <select className="createsurveything">
              {CITIES.map((city: string) => (
                <option onChange={() => setCity('Jotain')} key={city}>
                  {city}
                </option>
              ))}
            </select>
          </>
        )
      }
    </div>
  );
};

const SelectPostalCode = () => {
  return (
    <div>
      <label className="flex-row">
        Postinumero
        <input type="checkbox" />
      </label>
      Postinumero
      <select>
        <option>00100</option>
        <option>00120</option>
        <option>00130</option>
      </select>
    </div>
  );
};
