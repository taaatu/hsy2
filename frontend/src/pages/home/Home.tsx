import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const HomePage = () => {
  return (
    <div style={{ padding: '2em' }}>
      {/* <Navigate to="/survey" /> */}
      <h1>Home page</h1>
      <p>
        Visual result Page, Property Manager Log in, PM Main Pnpm age, PM Make
        survey , PM Previev Survey, PM Your Surveys, PM View/Edit Survey, PM
        Survey Results
      </p>
      <div className={styles.test_box}></div>
      <div className="column">
        <Link to="/survey">Survey answer</Link>
        <Link to="/survey/edit">Edit Survey</Link>
        <Link to="/create">Create Survey</Link>
        <Link to="/login">Login</Link>
        <Link to="/surveys">Surveys</Link>
        {/* <Link to="/preview">Preview</Link> */}
        <Link to="/properties">Properties</Link>
        <Link to="/user-results">User Results</Link>
      </div>
    </div>
  );
};

export default HomePage;
