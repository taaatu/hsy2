import { useEffect, useState } from 'react';
import useBuilding from '../../../hooks/BuildingHook';
import { Building } from '../../../interfaces/Building';
import { BuildingList } from '../../../components/lists/BuildingList';
import { SearchBar } from '../../../components/SearchBar';

const ManagerProperties = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const { getAllBuildings } = useBuilding();
  const [search, setSearch] = useState('');

  const filteredBuildings = buildings.filter((building) => {
    return (
      building.street.toLowerCase().includes(search.toLowerCase()) ||
      building.post_code.toLowerCase().includes(search.toLowerCase()) ||
      building.city.toLowerCase().includes(search.toLowerCase()) ||
      building.name.toLowerCase().includes(search.toLowerCase())
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
      <h1>Omat taloyhtiöt {`(${buildings.length})`}</h1>
      <SearchBar placeholder="Hae taloyhtiöitä" handleSearch={handleSearch} />
      <BuildingList buildings={filteredBuildings} />
    </main>
  );
};

export default ManagerProperties;
