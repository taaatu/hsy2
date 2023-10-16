import { useEffect, useState } from 'react';
import useBuilding from '../../../hooks/BuildingHook';
import { Building } from '../../../interfaces/Building';
import styles from './Properties.module.css';
import { useNavigate } from 'react-router-dom';

const PropertiesPage = () => {
  const { getAllBuildings } = useBuilding();
  const [buildings, setBuildings] = useState<Building[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setBuildings(await getAllBuildings());
    })();
  }, []);

  return (
    <div>
      <h1>Properties Page</h1>
      <div>
        {buildings.map((building) => (
          <div className={styles.listItem}>
            <div>
              {building.street}, {building.post_code}, {building.city}
            </div>
            <div>{building.name}</div>
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
    </div>
  );
};

export default PropertiesPage;
