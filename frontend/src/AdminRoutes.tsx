import { Navigate, Outlet } from 'react-router-dom';
import { TopNavBar } from './components/TopNavBar';

// https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c
const AdminRoutes = () => {
  const token = 'some token';
  return token ? (
    <>
      <TopNavBar isAdmin={true} />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoutes;
