import { Link } from 'react-router-dom';
import {
  ADMIN_HOME,
  MANAGERS_PATH,
  MANAGER_HOME,
} from '../variables/RoutePaths';
import styles from './Components.module.css';

type Props = {
  isAdmin: boolean;
};

export const TopNavBar = ({ isAdmin }: Props) => {
  return (
    <div id="topnav-bar">{isAdmin ? <AdminLinks /> : <ManagerLinks />}</div>
  );
};

const DropDown = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={styles.dropdown}>
      <button className={styles.dropbtn}>{title}</button>
      <div className={styles.dropdownContent}>{children}</div>
    </div>
  );
};

const AdminLinks = () => (
  <>
    <DropDown title="Taloyhtiö">
      <Link to="/admin/properties">Taloyhtiöt</Link>
    </DropDown>
    <DropDown title="Kysely">
      <Link to="/admin/surveys">Kyselyt</Link>
      <Link to="/admin/surveys/create">Luo kysely</Link>
    </DropDown>
    <DropDown title="Isännöitsijä">
      <Link to="/admin/managers/add">Lisää isännöitsijä</Link>
      <Link to={MANAGERS_PATH}>Isännöitsijät</Link>
    </DropDown>
    <DropDown title="Profiili">
      <Link to="/logout">Kirjaudu ulos</Link>
    </DropDown>
  </>
);

const ManagerLinks = () => (
  <>
    <DropDown title="Taloyhtiö">
      <Link to="/manager/properties">Taloyhtiöt</Link>
      <Link to="/manager/properties/add">Lisää taloyhtiö</Link>
    </DropDown>
    <DropDown title="Profiili">
      <Link to="/manager/profile">Profiili</Link>
      <Link to="/logout">Kirjaudu ulos</Link>
    </DropDown>
  </>
);
