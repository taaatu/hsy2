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
  return { getUserList };
};

export { useUser };
