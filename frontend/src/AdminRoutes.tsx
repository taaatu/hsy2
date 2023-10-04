import { Navigate, Outlet } from 'react-router-dom';
import { TopNavBar } from './components/TopNavBar';
import { TOKEN } from './variables/Constants';

// https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c
const AdminRoutes = () => {
  return TOKEN ? (
    <>
      <TopNavBar isAdmin={true} />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoutes;
