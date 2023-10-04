import { Outlet, Navigate } from 'react-router-dom';
import { TopNavBar } from './components/TopNavBar';
import { TOKEN } from './variables/Constants';

export const PropertyManagerRoutes = () => {
  return TOKEN ? (
    <>
      <TopNavBar isAdmin={false} />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};
