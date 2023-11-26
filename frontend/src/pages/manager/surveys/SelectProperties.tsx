import { useContext, useEffect, useState } from 'react';
import { Building } from '../../../interfaces/Building';
import useBuilding from '../../../hooks/BuildingHook';
import Modal from 'react-bootstrap/Modal';
import { SearchBar } from '../../../components/SearchBar';
import useSurvey from '../../../hooks/SurveyHook';
import { AssignedSurvey } from '../../../interfaces/Survey';
import { MainContext } from '../../../context/MainContext';

type Props = {
  surveyid: number;
  assignedSurveys: AssignedSurvey[];
};

export const SelectProperties = ({ surveyid, assignedSurveys }: Props) => {
  const { getAllBuildings } = useBuilding();
  const { assignSurveyToBuildings } = useSurvey();
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [search, setSearch] = useState('');
  const [modelOpen, setModelOpen] = useState<boolean>(false);
  const [selectedBuildings, setSelectedBuildings] = useState<Building[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const { setUpdate, update } = useContext(MainContext);

  const filteredBuildings = buildings.filter((building) => {
    return (
      building.street.toLowerCase().includes(search.toLowerCase()) ||
      building.name.toLowerCase().includes(search.toLowerCase()) ||
      building.city.toLowerCase().includes(search.toLowerCase()) ||
      building.post_code.toLowerCase().includes(search.toLowerCase())
    );
  });

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const removeFromSelected = (id: number) => {
    console.log('remove from selected: ', id);
    setSelectedBuildings(selectedBuildings.filter((b) => b.building_id !== id));
  };

  const onSelectAll = () => {
    if (selectAll) {
      setSelectedBuildings([]);
      setSelectAll(false);
      return;
    }
    setSelectedBuildings(buildings);
    setSelectAll(true);
  };

  const handleSubmit = async () => {
    await assignSurveyToBuildings(selectedBuildings, surveyid);
    handleCloseModal();
    setUpdate(update + 1);
    setSelectedBuildings([]);
  };

  const handleShowModal = () => setModelOpen(true);
  const handleCloseModal = () => setModelOpen(false);

  useEffect(() => {
    (async () => {
      const res = await getAllBuildings();
      const _buildings = res.filter(
        (b) => !assignedSurveys.some((as) => as.b_id === b.building_id)
      );
      console.log('/assigned surveys: ', assignedSurveys);
      console.log('res: ', res);
      console.log('buildings: ', _buildings);
      if (!_buildings) return;
      setBuildings(_buildings);
    })();
  }, [assignedSurveys]);

  return (
    <>
      <button type="button" onClick={handleShowModal}>
        Lisää taloyhtiöt
      </button>

      <Modal show={modelOpen} onHide={handleCloseModal} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>Valitse taloyhtiöt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="column" style={{ position: 'relative' }}>
            <label style={{ gap: '0.5rem' }} className="flex-row center-align">
              <div>Valitse kaikki</div>
              <input
                onChange={() => onSelectAll()}
                checked={selectAll}
                type="checkbox"
              />
            </label>
            <SearchBar
              placeholder="Hae taloyhtiötä"
              handleSearch={handleSearch}
            />

            <div>
              {filteredBuildings.map((building: Building) => (
                <div
                  key={building.building_id}
                  className="flex-row"
                  style={{ justifyContent: 'space-between' }}
                >
                  <div style={{ flex: 1 }}>{building.name}</div>
                  <div style={{ flex: 2 }}>
                    {building.street}, {building.post_code}, {building.city}
                  </div>
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
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleSubmit}>Lisää</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
