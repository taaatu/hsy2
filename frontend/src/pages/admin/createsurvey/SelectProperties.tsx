import { useEffect, useState } from 'react';
import { CITIES } from '../../../variables/Constants';
import styles from './CreateSurvey.module.css';
import { Building } from '../../../interfaces/Building';
import useBuilding from '../../../hooks/BuildingHook';

export enum SelectLevel {
  ALL = 'all',
  CITY = 'city',
  POSTAL_CODE = 'postal_code',
  NONE = 'none',
}
type Props = {
  selectLevel: SelectLevel;
  setSelectLevel: (selectLevel: SelectLevel) => void;
  selectedBuildings: Building[];
  setSelectedBuildings: (buildings: Building[]) => void;
};

export const SelectProperties = ({
  setSelectLevel,
  selectLevel,
  setSelectedBuildings,
  selectedBuildings,
}: Props) => {
  const { getAllBuildings } = useBuilding();
  const [buildings, setBuildings] = useState<Building[]>([]);

  const addBuilding = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const _b = buildings.find((b) => b.building_id === Number(value));
    const duplicate = selectedBuildings.find(
      (b) => b.building_id === Number(value)
    );
    if (duplicate) return;
    if (!_b) return;
    setSelectedBuildings([...selectedBuildings, _b]);
    console.log('selected buildings: ', selectedBuildings);
  };

  const removeFromSelected = (id: number) => {
    setSelectedBuildings(selectedBuildings.filter((b) => b.building_id !== id));
  };

  const onSelectAll = () => {
    if (selectLevel === SelectLevel.ALL) {
      setSelectedBuildings([]);
      setSelectLevel(SelectLevel.NONE);
      return;
    }
    setSelectedBuildings(buildings);
    setSelectLevel(SelectLevel.ALL);
  };

  useEffect(() => {
    (async () => {
      setBuildings(await getAllBuildings());
    })();
  }, []);

  return (
    <div>
      <h2>Valitse taloyhtiöt</h2>{' '}
      <div style={{ backgroundColor: 'white' }}>
        <label style={{ display: 'flex', flexDirection: 'row' }}>
          Kaikki
          <input
            onChange={() => onSelectAll()}
            checked={selectLevel === SelectLevel.ALL}
            type="checkbox"
          />
        </label>
        <div style={{ position: 'relative' }}>
          {selectLevel === SelectLevel.ALL && (
            <div className={styles.overlay}></div>
          )}
          <div className="flex-row" style={{ gap: '1rem' }}>
            <select onChange={addBuilding} style={{ height: 'fit-content' }}>
              {buildings.map((building: Building) => (
                <option key={building.building_id} value={building.building_id}>
                  {building.name} {building.building_id}
                </option>
              ))}
            </select>
            <div>
              Taloyhtiöt {`(${selectedBuildings.length})`}
              {selectedBuildings.map((building: Building) => (
                <div key={building.building_id}>
                  {building.name}{' '}
                  <button
                    onClick={() => removeFromSelected(building.building_id)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* <SelectCity
            selectLevel={selectLevel}
            setSelectLevel={setSelectLevel}
          />
          <SelectPostalCode /> */}
        </div>
      </div>
    </div>
  );
};

const SelectProperty = ({ buildings }: { buildings: Building[] }) => {
  return (
    <div>
      <select>
        {buildings.map((building: Building) => (
          <option key={building.building_id}>{building.name}</option>
        ))}
      </select>
    </div>
  );
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
