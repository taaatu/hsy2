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
  const getUserById = async (userid: string) => {
    try {
      const response = await doFetch('user/userid/' + userid, 'GET');
      return response as User;
    } catch (error) {
      console.error('get user by id', error);
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
  const modifyUser = async (user: User) => {
    try {
      const response = await doFetch(
        'user/update/' + user.user_id,
        'PUT',
        user
      );
      return response as MessageResponse;
    } catch (error) {
      console.error('modify user', error);
    }
  };
  const deleteUser = async (userid: number) => {
    try {
      const response = await doFetch('user/userid/' + userid, 'DELETE');
      return response as MessageResponse;
    } catch (error) {
      console.error('delete user', error);
    }
  };

  const getUserByToken = async () => {
    try {
      const response = await doFetch('user/token', 'GET');
      return response as User;
    } catch (error) {
      console.error('get user by token', error);
    }
  };

  return {
    getUserList,
    getUserById,
    addUser,
    modifyUser,
    deleteUser,
    getUserByToken,
  };
};

export { useUser };
