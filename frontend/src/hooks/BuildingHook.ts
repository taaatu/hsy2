import { Building, BuildingInput } from '../interfaces/Building';
import { MessageResponse } from '../interfaces/Response';
import useFetch from './DoFetch';

const useBuilding = () => {
  const { doFetch } = useFetch();

  const getAllBuildings = async () => {
    try {
      const response = await doFetch('building', 'GET');
      console.log('get all buildings', response);
      return response as Building[];
    } catch (error: any) {
      throw new Error(error.message || error);
    }
  };

  const addBuilding = async (building: BuildingInput) => {
    try {
      console.log('Add property: ', building);
      const response = await doFetch('building', 'POST', building);
      console.log('add property response: ', response);
      alert('Taloyhtiö lisätty');
      return response as MessageResponse;
    } catch (error: any) {
      throw new Error(error.message || error);
    }
  };
  return { getAllBuildings, addBuilding };
};

export default useBuilding;
