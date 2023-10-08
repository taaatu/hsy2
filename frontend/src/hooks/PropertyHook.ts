import { PropertyInput } from '../interfaces/Property';

const useProperty = () => {
  const addProperty = async (property: PropertyInput) => {
    try {
      console.log('Add property: ', property);
      alert(JSON.stringify(property));
    } catch (error) {
      console.error(error);
    }
  };
  return { addProperty };
};

export default useProperty;
