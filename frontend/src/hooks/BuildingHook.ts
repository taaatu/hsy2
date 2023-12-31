import { Building, BuildingInput } from '../interfaces/Building';
import CustomError from '../interfaces/CustomError';
import useFetch from './DoFetch';

const useBuilding = () => {
  const { doFetch } = useFetch();

  const getAllBuildings = async () => {
    try {
      const response = await doFetch('building', 'GET');
      console.log('get all buildings', response);
      return response as Building[];
    } catch (error: any) {
      console.error('Get all buildings: ', error.message);
      return [];
    }
  };

  const getBuildingsByUserId = async (id: number) => {
    const buildings = await getAllBuildings();
    const filteredBuildings = buildings.filter(
      (building) => building.u_id === id
    );
    return filteredBuildings;
  };

  const getBuildingById = async (id: string) => {
    try {
      const response = await doFetch(`building/buildingid/${id}`, 'GET');
      console.log('get building by id', response);
      return response as Building;
    } catch (error: any) {
      console.error('Get building by id: ', error.message);
    }
  };

  const addBuilding = async (building: BuildingInput) => {
    try {
      console.log('Add property: ', building);
      const response = await doFetch('building', 'POST', building);
      console.log('add property response: ', response);
    } catch (error: any) {
      console.error('Add building: ', error.message);
      return new CustomError(error.message, error.status);
    }
  };

  const modifyBuilding = async (building: Building) => {
    try {
      console.log('Modify building: ', building);
      const response = await doFetch(
        `building/buildingid/${building.building_id}`,
        'PUT',
        building
      );
      console.log('modify building response: ', response);
    } catch (error: any) {
      console.error('Modify building: ', error.message);
      return new CustomError(error.message, error.status);
    }
  };

  const deleteBuilding = async (id: string) => {
    try {
      console.log('Delete building: ', id);
      const response = await doFetch(`building/buildingid/${id}`, 'DELETE');
      console.log('delete building response: ', response);
      alert('Taloyhtiö poistettu');
      return true;
    } catch (error: any) {
      console.error('Delete building: ', error.message);
      alert(error.message);
      return new CustomError(error.message, error.status);
    }
  };
  return {
    getAllBuildings,
    getBuildingsByUserId,
    getBuildingById,
    addBuilding,
    modifyBuilding,
    deleteBuilding,
  };
};

export default useBuilding;
