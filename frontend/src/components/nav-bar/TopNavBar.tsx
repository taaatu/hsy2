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
          <p>Taloyhtiöt</p>
        </>
      }
    >
      <NavDropdown.Item as={Link} to={'/admin/properties'}>
        Taloyhtiöt
      </NavDropdown.Item>
    </NavDropdown>
    <NavDropdown
      id={styles.navDropdown}
      title={
        <>
          <FaClipboardList /> <p>Kyselyt</p>
        </>
      }
    >
      <NavDropdown.Item as={Link} to={'/admin/surveys'}>
        Kyselyt
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to={'/admin/surveys/create'}>
        Luo kysely
      </NavDropdown.Item>
    </NavDropdown>
    <NavDropdown
      id={styles.navDropdown}
      title={
        <>
          <FaUsers /> <p>Isännöitsijät</p>
        </>
      }
    >
      <NavDropdown.Item as={Link} to={'/admin/managers/add'}>
        Lisää isännöitsijä
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to={MANAGERS_PATH}>
        Isännöitsijät
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
      <NavDropdown.Item as={Link} to={'/logout'}>
        Kirjaudu ulos
      </NavDropdown.Item>
    </NavDropdown>
  </>
);

const ManagerLinks = () => (
  <>
    <NavDropdown
      id={styles.navDropdown}
      title={
        <>
          <FaHome />
          <p>Taloyhtiöt</p>
        </>
      }
    >
      <NavDropdown.Item as={Link} to={'/manager/properties'}>
        Taloyhtiöt
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to={'/manager/properties/add'}>
        Lisää taloyhtiö
      </NavDropdown.Item>
    </NavDropdown>
    <NavDropdown
      id={styles.navDropdown}
      title={
        <>
          <FaClipboardList /> <p>Kyselyt</p>
        </>
      }
    >
      <NavDropdown.Item as={Link} to={'/manager/surveys'}>
        Kyselyt
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
      <NavDropdown.Item as={Link} to={'/manager/profile'}>
        Profiili
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item as={Link} to={'/logout'}>
        Kirjaudu ulos
      </NavDropdown.Item>
    </NavDropdown>
  </>
);
