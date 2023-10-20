import { Link } from 'react-router-dom';
import { MANAGERS_PATH } from '../../variables/RoutePaths';
import styles from './NavBar.module.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaHome, FaUsers, FaClipboardList, FaUserCircle } from 'react-icons/fa';

type Props = {
  isAdmin: boolean;
};

export const TopNavBar = ({ isAdmin }: Props) => {
  return (
    <Navbar id={styles.topnavBar}>
      <Navbar.Brand className={styles.topBarAppName}>HIMA</Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className={styles.navLinks}>
          {isAdmin ? <AdminLinks /> : <ManagerLinks />}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const AdminLinks = () => (
  <>
    <NavDropdown
      id={styles.navDropdown}
      title={
        <>
          <FaHome />
          <p>Taloyhtiö</p>
        </>
      }
    >
      <NavDropdown.Item>
        <Link to="/admin/properties">Taloyhtiöt</Link>
      </NavDropdown.Item>
    </NavDropdown>
    <NavDropdown
      id={styles.navDropdown}
      title={
        <>
          <FaClipboardList /> <p>Kysely</p>
        </>
      }
    >
      <NavDropdown.Item>
        <Link to="/admin/surveys">Kyselyt</Link>
      </NavDropdown.Item>
      <NavDropdown.Item>
        <Link to="/admin/surveys/create">Luo kysely</Link>
      </NavDropdown.Item>
    </NavDropdown>
    <NavDropdown
      id={styles.navDropdown}
      title={
        <>
          <FaUsers /> <p>Isännöitsijä</p>
        </>
      }
    >
      <NavDropdown.Item>
        <Link to="/admin/managers/add">Lisää isännöitsijä</Link>
      </NavDropdown.Item>
      <NavDropdown.Item>
        <Link to={MANAGERS_PATH}>Isännöitsijät</Link>
      </NavDropdown.Item>
    </NavDropdown>
    <NavDropdown
      id={styles.navDropdown}
      title={
        <>
          <FaUserCircle /> <p>Profiili</p>
        </>
      }
    >
      <NavDropdown.Divider />
      <NavDropdown.Item>
        <Link to="/logout">Kirjaudu ulos</Link>
      </NavDropdown.Item>
    </NavDropdown>
  </>
);

const ManagerLinks = () => (
  <>
    <NavDropdown title="Taloyhtiö" id="basic-nav-dropdown">
      <NavDropdown.Item>
        <Link to="/manager/properties">Taloyhtiöt</Link>
      </NavDropdown.Item>
      <NavDropdown.Item>
        <Link to="/manager/properties/add">Lisää taloyhtiö</Link>
      </NavDropdown.Item>
    </NavDropdown>
    <NavDropdown title="Profiili" id="basic-nav-dropdown">
      <NavDropdown.Item>
        <Link to="/manager/profile">Profiili</Link>
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item>
        <Link to="/logout">Kirjaudu ulos</Link>
      </NavDropdown.Item>
    </NavDropdown>
  </>
);
