import { useEffect } from 'react';
import useAuth from '../hooks/AuthHook';

const Logout = () => {
  const { logoutUser } = useAuth();

  useEffect(() => {
    logoutUser();
  }, []);

  return <div>Logout</div>;
};

export default Logout;
