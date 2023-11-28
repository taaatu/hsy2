import { Link } from 'react-router-dom';
import { MANAGERS_PATH } from '../../variables/RoutePaths';
import styles from './NavBar.module.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaHome, FaUsers, FaClipboardList, FaUserCircle } from 'react-icons/fa';
import { useContext } from 'react';
import { MainContext } from '../../context/MainContext';

type Props = {
  isAdmin: boolean;
};

export const TopNavBar = ({ isAdmin }: Props) => {
  const { curentUser } = useContext(MainContext);
  return (
    <Navbar id={styles.topnavBar}>
      <Navbar.Brand className={styles.topBarAppName}>
        <img style={{ width: '100px' }} src="https://i.imgur.com/DkIswJE.png" />
      </Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className={styles.navLinks}>
          {isAdmin ? <AdminLinks /> : <ManagerLinks />}
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse id={styles.userName} className="justify-content-end">
        <Navbar.Text>{curentUser?.full_name}</Navbar.Text>
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
      className="nav-surveys"
      title={
        <>
          <FaClipboardList /> <p>Kyselyt</p>
        </>
      }
    >
      <NavDropdown.Item id="surveys-link" as={Link} to={'/admin/surveys'}>
        Kyselyt
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item
        id="create-survey-link"
        as={Link}
        to={'/admin/surveys/create'}
      >
        Luo kysely
      </NavDropdown.Item>
    </NavDropdown>
    <NavDropdown
      id={styles.navDropdown}
      className="nav-managers"
      title={
        <>
          <FaUsers /> <p>Isännöitsijät</p>
        </>
      }
    >
      <NavDropdown.Item as={Link} to={MANAGERS_PATH}>
        Isännöitsijät
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item
        id="add-managers-link"
        as={Link}
        to={'/admin/managers/add'}
      >
        Lisää isännöitsijä
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
      <NavDropdown.Item id="profile-link" as={Link} to={'/admin/profile'}>
        Omat tiedot
      </NavDropdown.Item>
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
      <NavDropdown.Divider />
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
      className="nav-profile"
      title={
        <>
          <FaUserCircle /> <p>Profiili</p>
        </>
      }
    >
      <NavDropdown.Item id="profile-link" as={Link} to={'/manager/profile'}>
        Omat tiedot
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item as={Link} to={'/logout'}>
        Kirjaudu ulos
      </NavDropdown.Item>
    </NavDropdown>
  </>
);
