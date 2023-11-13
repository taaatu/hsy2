import { useNavigate } from 'react-router-dom';
import { MessageResponse } from '../interfaces/Response';
import { User } from '../interfaces/User';
import useFetch from './DoFetch';
import { useContext } from 'react';
import { MainContext } from '../context/MainContext';
import CustomError from '../interfaces/CustomError';

const useUser = () => {
  const { doFetch } = useFetch();
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(MainContext);

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
      console.log('add user: ', response);
      return response as MessageResponse;
    } catch (error: any) {
      console.error('add user: ', error.message);
      return new CustomError(error.message, error.status);
    }
  };

  const modifyUser = async (user: User) => {
    try {
      const response = await doFetch('user/update', 'PUT', user);
      console.log('modify user res: ', response);
      return response as MessageResponse;
    } catch (error: any) {
      console.error('modify user', error);
      return new CustomError(error.message, error.status);
    }
  };
  const deleteUser = async (userid: number) => {
    try {
      if (!confirm('Haluatko varmasti poistaa käyttäjän?')) return;
      const response = await doFetch('user/userid/' + userid, 'DELETE');
      console.log('delete user: ', response);
      alert('Käyttäjä poistettu');
      navigate('/');
    } catch (error) {
      alert('Käyttäjän poistaminen epäonnistui');
      console.error('delete user', error);
    }
  };

  const getUserByToken = async () => {
    try {
      const response = await doFetch('user/token', 'GET');
      if (response) setCurrentUser(response);
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
