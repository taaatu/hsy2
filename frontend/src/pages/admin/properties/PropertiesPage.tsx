import { useEffect, useState } from 'react';
import useBuilding from '../../../hooks/BuildingHook';
import { Building } from '../../../interfaces/Building';
import { SearchBar } from '../../../components/SearchBar';
import { BuildingList } from '../../../components/lists/BuildingList';

const PropertiesPage = () => {
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
      <BuildingList buildings={filteredBuildings} />
    </main>
  );
};

export default PropertiesPage;
