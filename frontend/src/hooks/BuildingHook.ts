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
  return { getAllBuildings, addBuilding };
};

export default useBuilding;
