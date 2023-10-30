import { useNavigate } from 'react-router-dom';
import { TokenResponse } from '../interfaces/Response';
import { LoginInput, UserGroup } from '../interfaces/User';
import { ADMIN_HOME, MANAGER_HOME } from '../variables/RoutePaths';
import { useContext } from 'react';
import { MainContext } from '../context/MainContext';
import useFetch from './DoFetch';
import CustomError from '../interfaces/CustomError';

const useAuth = () => {
  const navigate = useNavigate();
  const { doFetch } = useFetch();
  const { setCurrentUser } = useContext(MainContext);

  const loginUser = async (args: LoginInput) => {
    try {
      const response = (await doFetch(
        'auth/login',
        'POST',
        args
      )) as TokenResponse;
      console.log('login user input: ', args);
      console.log('login user', response);
      sessionStorage.setItem('token', response.token);
      setCurrentUser(response.user);
      // Navigate to correct home page based on user group
      response.user.user_group === UserGroup.ADMIN
        ? navigate(ADMIN_HOME)
        : navigate(MANAGER_HOME);
      return response;
    } catch (error: any) {
      console.error('Login user: ', error.message);
      return new CustomError(error.message, error.status);
    }
  };

  const logoutUser = () => {
    sessionStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/login');
  };

  return { loginUser, logoutUser };
};

export default useAuth;
