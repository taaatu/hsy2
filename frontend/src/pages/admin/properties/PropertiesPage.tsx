import { useEffect, useState } from 'react';
import useBuilding from '../../../hooks/BuildingHook';
import { Building } from '../../../interfaces/Building';
import styles from './Properties.module.css';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../../../components/SearchBar';

export const PropertiesPage = () => {
  const { getAllBuildings } = useBuilding();
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [search, setSearch] = useState('');

  const filteredBuildings = buildings.filter((building) => {
    return (
      building.name.toLowerCase().includes(search.toLowerCase()) ||
      building.street.toLowerCase().includes(search.toLowerCase()) ||
      building.city.toLowerCase().includes(search.toLowerCase()) ||
      building.post_code.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  useEffect(() => {
    (async () => {
      setBuildings(await getAllBuildings());
    })();
  }, []);

  return (
    <main className="column">
      <h1>Taloyhtiöt</h1>
      <SearchBar placeholder="Hae taloyhtiötä" handleSearch={handleSearch} />
      <div>
        {buildings.map((building) => (
          <div className={styles.listItem}>
            <div style={{ flex: 1 }}>
              {building.street}, {building.post_code}, {building.city}
            </div>
            <div style={{ flex: 1 }}>{building.name}</div>
            <button
              onClick={() =>
                navigate('/admin/properties/' + building.building_id)
              }
            >
              Siirry
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};
