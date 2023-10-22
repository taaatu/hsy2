import { useNavigate } from 'react-router-dom';
import { Building } from '../../interfaces/Building';
import styles from './Lists.module.css';
import { useContext } from 'react';
import { MainContext } from '../../context/MainContext';
import { UserGroup } from '../../interfaces/User';

type Props = {
  buildings: Building[];
};

export const BuildingList = ({ buildings }: Props) => {
  const { curentUser } = useContext(MainContext);
  const navigate = useNavigate();
  return (
    <div>
      {buildings.map((building) => (
        <div className={styles.buildingListItem}>
          <div style={{ flex: 1 }}>
            {building.street}, {building.post_code}, {building.city}
          </div>
          <div style={{ flex: 1 }}>{building.name}</div>
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
      ))}
    </div>
  );
};
