import { Link, useNavigate } from 'react-router-dom';
import { ADMIN_HOME, MANAGER_HOME } from '../variables/RoutePaths';

type Props = {
  isAdmin: boolean;
};

export const TopNavBar = ({ isAdmin }: Props) => {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <div id="topnav-bar">
      <button onClick={onLogout}>Kirjaudu ulos</button>
      {isAdmin ? <AdminLinks /> : <ManagerLinks />}
    </div>
  );
};

const AdminLinks = () => (
  <>
    <Link to={MANAGER_HOME}>Isännöitsijä</Link>
    <Link to="/admin/create">Luo kysely</Link>
    <Link to="/admin/adduser">Lisää isännöitsijä</Link>
    <Link to="/surveys">Kyselyt</Link>
  </>
);

const ManagerLinks = () => (
  <>
    <Link to={ADMIN_HOME}>Super admin</Link>
    <Link to="/manager/addproperty">Lisää taloyhtiö</Link>
    <Link to="/surveys">Kyselyt</Link>
  </>
);