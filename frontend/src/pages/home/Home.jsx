import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const HomePage = () => {
  return (
    <div>
      {/* <Navigate to="/survey" /> */}
      <h1>Log in User</h1>
      <p>
        Visual result Page, Property Manager Log in, PM Main Pnpm age, PM Make
        survey , PM Previev Survey, PM Your Surveys, PM View/Edit Survey, PM
        Survey Results
      </p>
      <div className={styles.test_box}></div>
      <div className="column">
        <Link to="/survey">Survey</Link>
        <Link to="/create">Create Survey</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default HomePage;
