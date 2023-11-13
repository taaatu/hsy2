import { useNavigate } from 'react-router-dom';
import { Building } from '../../interfaces/Building';
import styles from './Lists.module.css';
import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../context/MainContext';
import { UserGroup } from '../../interfaces/User';
import { LoadingList } from './LoadingList';
import { SearchBar } from '../SearchBar';
import useBuilding from '../../hooks/BuildingHook';

type Props = {
  userid?: number;
};

export const BuildingList = ({ userid }: Props) => {
  const { curentUser } = useContext(MainContext);
  const navigate = useNavigate();
  const { getAllBuildings, getBuildingsByUserId } = useBuilding();
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
      const _buildings = userid
        ? await getBuildingsByUserId(userid)
        : await getAllBuildings();
      setBuildings(_buildings);
    })();
  }, [userid]);

  return (
    <LoadingList>
      <div className="sticky-header color3 rounded padding1">
        <SearchBar placeholder="Hae taloyhtiötä" handleSearch={handleSearch} />
        <div className={`bold ${styles.buildingsHeader}`}>
          <div>Osoite</div>
          <div>Nimi</div>
          <div>Isännöitsijä</div>
          <div className={styles.btnContainer}></div>
        </div>
      </div>

      {filteredBuildings.map((building) => (
        <div className={styles.buildingListItem} key={building.building_id}>
          <div style={{ flex: 1 }}>
            {building.street}, {building.post_code}, {building.city}
          </div>
          <div style={{ flex: 1 }}>{building.name}</div>
          <div style={{ flex: 1 }}>{building.manager_name}</div>
          <div className={styles.btnContainer}>
            <button
              onClick={() =>
                navigate(
                  curentUser?.user_group === UserGroup.ADMIN
                    ? '/admin/properties/' + building.building_id
                    : '/manager/properties/' + building.building_id
                )
              }
            >
              Siirry
            </button>
          </div>
        </div>
      ))}
    </LoadingList>
  );
};
