import { useNavigate } from 'react-router-dom';
import { TokenResponse } from '../interfaces/Response';
import { LoginInput, UserGroup } from '../interfaces/User';
import { doFetch } from './DoFetch';
import { ADMIN_HOME, MANAGER_HOME } from '../variables/RoutePaths';

const useAuth = () => {
  const navigate = useNavigate();

  const loginUser = async (args: LoginInput) => {
    try {
      const response = (await doFetch(
        'auth/login',
        'POST',
        args
      )) as TokenResponse;
      console.log('login user', response);
      sessionStorage.setItem('token', response.token);
      response.user.user_group === UserGroup.ADMIN
        ? navigate(ADMIN_HOME)
        : navigate(MANAGER_HOME);
    } catch (error) {
      alert('Kirjautuminen epäonnistui');
      console.error('login user', error);
    }
  };

  const logoutUser = () => {
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  return { loginUser, logoutUser };
};

export default useAuth;
