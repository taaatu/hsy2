import { useEffect, useState } from 'react';
import useBuilding from '../../../hooks/BuildingHook';
import { Building } from '../../../interfaces/Building';
import { BuildingList } from '../../../components/lists/BuildingList';

export const ManagerProperties = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const { getAllBuildings } = useBuilding();

  useEffect(() => {
    (async () => {
      setBuildings(await getAllBuildings());
    })();
  }, []);

  return (
    <main className="column">
      <h1>Omat taloyhtiöt {`(${buildings.length})`}</h1>
      <BuildingList buildings={buildings} />
    </main>
  );
};
