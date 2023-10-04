import { Navigate, Outlet } from 'react-router-dom';
import { TopNavBar } from './components/TopNavBar';
import { TOKEN } from './variables/Constants';
import { useContext } from 'react';
import { MainContext } from './context/MainContext';
import { UserGroup } from './interfaces/User';

// https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c
const AdminRoutes = () => {
  const { curentUser } = useContext(MainContext);
  return TOKEN && curentUser?.user_group === UserGroup.ADMIN ? (
    <>
      <TopNavBar isAdmin={true} />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoutes;
