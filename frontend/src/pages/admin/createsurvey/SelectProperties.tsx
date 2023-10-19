import { useEffect, useState } from 'react';
import { CITIES } from '../../../variables/Constants';
import styles from './CreateSurvey.module.css';
import { Building } from '../../../interfaces/Building';
import useBuilding from '../../../hooks/BuildingHook';
import Modal from 'react-bootstrap/Modal';
import { SearchBar } from '../../../components/SearchBar';

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
  const [searchBuildings, setSearchBuildings] = useState<Building[]>([]);
  const [modelOpen, setModelOpen] = useState<boolean>(false);

  const addBuilding = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (!checked) {
      removeFromSelected(Number(value));
      return;
    }
    const _b = buildings.find((b) => b.building_id === Number(value));
    const duplicate = selectedBuildings.find(
      (b) => b.building_id === Number(value)
    );
    if (duplicate) return;
    if (!_b) return;
    setSelectedBuildings([...selectedBuildings, _b]);
    console.log('selected buildings: ', selectedBuildings);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    const filteredBuildings = buildings.filter(
      (building) =>
        building.street.toLowerCase().includes(search.toLowerCase()) ||
        building.name.toLowerCase().includes(search.toLowerCase()) ||
        building.city.toLowerCase().includes(search.toLowerCase()) ||
        building.post_code.toLowerCase().includes(search.toLowerCase())
    );
    setSearchBuildings(filteredBuildings);
  };

  const removeFromSelected = (id: number) => {
    console.log('remove from selected: ', id);
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

  const handleShowModal = () => setModelOpen(true);
  const handleCloseModal = () => setModelOpen(false);

  useEffect(() => {
    (async () => {
      const _buildings = await getAllBuildings();
      setBuildings(_buildings);
      setSearchBuildings(_buildings);
    })();
  }, []);

  return (
    <div>
      <h2>Valitse taloyhtiöt</h2>{' '}
      <button type="button" onClick={handleShowModal}>
        Valitse taloyhtiöt
      </button>
      <label style={{ display: 'flex', flexDirection: 'row' }}>
        <h3>Kaikki</h3>
        <input
          onChange={() => onSelectAll()}
          checked={selectLevel === SelectLevel.ALL}
          type="checkbox"
        />
      </label>
      {modelOpen && (
        <Modal show={modelOpen} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Valitse taloyhtiöt</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ position: 'relative' }}>
              {selectLevel === SelectLevel.ALL && (
                <div className={styles.overlay}></div>
              )}
              <div /* className="flex-row" */ style={{ gap: '1rem' }}>
                <SearchBar
                  placeholder="Hae taloyhtiötä"
                  handleSearch={handleSearch}
                />
                <div
                  style={{
                    width: '100%',
                    height: '70vh',
                    overflow: 'scroll',
                    padding: '0.5rem',
                  }}
                >
                  {searchBuildings.map((building: Building) => (
                    <div
                      key={building.building_id}
                      className="flex-row"
                      style={{ justifyContent: 'space-between' }}
                    >
                      <div>{building.name}</div>
                      <div>
                        {building.street}, {building.post_code}, {building.city}
                      </div>
                      {/* <button onClick={() => addBuilding(building.building_id)}>
                        +
                      </button> */}
                      <input
                        checked={selectedBuildings.some(
                          (b) => b.building_id === building.building_id
                        )}
                        type="checkbox"
                        value={building.building_id}
                        onChange={addBuilding}
                      />
                    </div>
                  ))}
                </div>

                {/* <select
                  onChange={addBuilding}
                  style={{ height: 'fit-content' }}
                >
                  {buildings.map((building: Building) => (
                    <option
                      key={building.building_id}
                      value={building.building_id}
                    >
                      {building.name} {building.building_id}
                    </option>
                  ))}
                </select> */}
              </div>
              {/* <SelectCity
            selectLevel={selectLevel}
            setSelectLevel={setSelectLevel}
          />
          <SelectPostalCode /> */}
            </div>
          </Modal.Body>
        </Modal>
      )}
      <div style={{ backgroundColor: 'white' }}>
        <h4>Valitut taloyhtiöt {`(${selectedBuildings.length})`}</h4>
        {selectedBuildings.map((building: Building) => (
          <div
            key={building.building_id}
            className="flex-row"
            style={{ justifyContent: 'space-between' }}
          >
            {building.name}{' '}
            <div>
              {building.street}, {building.post_code}, {building.city}
            </div>
            <button onClick={() => removeFromSelected(building.building_id)}>
              X
            </button>
          </div>
        ))}
      </div>
      <div style={{ backgroundColor: 'white' }}>
        {/* <label style={{ display: 'flex', flexDirection: 'row' }}>
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
          </div> */}
        {/* <SelectCity
            selectLevel={selectLevel}
            setSelectLevel={setSelectLevel}
          />
          <SelectPostalCode /> */}
        {/* </div> */}
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
