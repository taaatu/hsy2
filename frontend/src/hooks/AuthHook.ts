import { TokenResponse } from '../interfaces/Response';
import { LoginInput } from '../interfaces/User';
import { doFetch } from './DoFetch';

const useAuth = () => {
  const loginUser = async (args: LoginInput) => {
    try {
      const response = await doFetch('auth/login', 'POST', args);
      console.log('login user', response);
      return response as TokenResponse;
    } catch (error) {
      console.error('login user', error);
    }
  };
  return { loginUser };
};

export default useAuth;
