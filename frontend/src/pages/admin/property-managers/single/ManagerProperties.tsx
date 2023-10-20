import { useEffect, useState } from 'react';
import useBuilding from '../../../../hooks/BuildingHook';
import { Building } from '../../../../interfaces/Building';
import styles from '../Managers.module.css';
import { User } from '../../../../interfaces/User';

type Props = {
  user: User;
};

export const ManagerProperties = ({ user }: Props) => {
  const { getAllBuildings } = useBuilding();
  const [buildings, setBuildings] = useState<Building[]>([]);

  useEffect(() => {
    (async () => {
      const _buildings = (await getAllBuildings()).filter(
        (b) => b.u_id === user.user_id
      );
      setBuildings(_buildings);
    })();
  }, []);

  return (
    <div>
      <h4>Taloyhtiöt {`(${buildings.length})`}</h4>
      {buildings.map((building) => (
        <div
          className={styles.listItem}
          style={{ backgroundColor: 'white' }}
          key={building.building_id}
        >
          {building.street}
        </div>
      ))}
    </div>
  );
};