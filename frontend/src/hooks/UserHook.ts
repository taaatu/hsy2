import { MessageResponse } from '../interfaces/Response';
import { User } from '../interfaces/User';
import { doFetch } from './DoFetch';

const useUser = () => {
  const getUserList = async () => {
    try {
      const response = await doFetch('user', 'GET');
      console.log('get user list', response);
      return response as User[];
    } catch (error) {
      console.error('get user list', error);
    }
  };
  const addUser = async (user: User) => {
    try {
      const response = await doFetch('user', 'POST', user);
      return response as MessageResponse;
    } catch (error) {
      console.error('add user', error);
    }
  };
  return { getUserList, addUser };
};

export { useUser };
