import { useEffect } from 'react';
import useAuth from '../hooks/AuthHook';

export const Logout = () => {
  const { logoutUser } = useAuth();

  useEffect(() => {
    logoutUser();
  }, []);

  return <div>Logout</div>;
};
