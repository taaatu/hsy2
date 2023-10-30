import { useContext } from 'react';
import { BASE_URL } from '../variables/Constants';
import { MainContext } from '../context/MainContext';
import CustomError from '../interfaces/CustomError';

const useFetch = () => {
  const { setIsLoading } = useContext(MainContext);
  const token = sessionStorage.getItem('token');

  const doFetch = async (endPoint: string, method: string, body?: object) => {
    try {
      setIsLoading(true);
      const options: any = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      };
      const response = await fetch(BASE_URL + endPoint, options);
      const json = await response.json();
      if (!response.ok) {
        throw new CustomError(json.message, response.status);
      }
      return json;
    } catch (error: any) {
      throw new CustomError(error.message, error.status);
    } finally {
      setIsLoading(false);
    }
  };
  return { doFetch };
};

export default useFetch;
