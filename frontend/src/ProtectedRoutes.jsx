import { Navigate, Outlet } from 'react-router-dom';

// https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c
const ProtectedRoutes = () => {
  const token = 'some token';
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
