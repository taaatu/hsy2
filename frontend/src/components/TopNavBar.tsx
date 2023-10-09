import { Link, useNavigate } from 'react-router-dom';
import {
  ADMIN_HOME,
  MANAGERS_PATH,
  MANAGER_HOME,
} from '../variables/RoutePaths';
import useAuth from '../hooks/AuthHook';

type Props = {
  isAdmin: boolean;
};

export const TopNavBar = ({ isAdmin }: Props) => {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  const onLogout = () => logoutUser();
  return (
    <div id="topnav-bar">
      <button onClick={onLogout}>Kirjaudu ulos</button>
      {isAdmin ? <AdminLinks /> : <ManagerLinks />}
    </div>
  );
};

const AdminLinks = () => (
  <>
    <Link to="/admin/surveys/create">Luo kysely</Link>
    <Link to="/admin/managers/add">Lisää isännöitsijä</Link>
    <Link to={MANAGERS_PATH}>Isännöitsijät</Link>
    <Link to="/admin/surveys">Kyselyt</Link>
  </>
);

const ManagerLinks = () => (
  <>
    <Link to="/manager/properties/add">Lisää taloyhtiö</Link>
    <Link to="/manager/properties">Taloyhtiöt</Link>
  </>
);
