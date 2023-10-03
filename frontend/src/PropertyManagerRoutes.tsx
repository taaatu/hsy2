import { Outlet, Navigate } from 'react-router-dom';
import { TopNavBar } from './components/TopNavBar';

export const PropertyManagerRoutes = () => {
  const token = localStorage.getItem('token');
  return token ? (
    <>
      <TopNavBar isAdmin={false} />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};
