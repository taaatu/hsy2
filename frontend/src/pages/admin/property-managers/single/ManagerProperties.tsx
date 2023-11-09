import { useEffect, useState } from 'react';
import useBuilding from '../../../../hooks/BuildingHook';
import { Building } from '../../../../interfaces/Building';
import styles from '../Managers.module.css';
import { User } from '../../../../interfaces/User';
import { BuildingList } from '../../../../components/lists/BuildingList';

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
      <div className='ManagerPropertiesTitles'>
      <h5>Osoite</h5>
      <h5>Rakennus</h5>
      <h5>Isännöitsijä</h5>
      </div>
      <BuildingList buildings={buildings} />
    </div>
  );
};
