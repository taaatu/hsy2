import { Outlet, Navigate } from 'react-router-dom';
import { TopNavBar } from './components/TopNavBar';
import { TOKEN } from './variables/Constants';
import { useContext } from 'react';
import { MainContext } from './context/MainContext';

export const PropertyManagerRoutes = () => {
  const { curentUser } = useContext(MainContext);
  return curentUser ? (
    <>
      <TopNavBar isAdmin={false} />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};
