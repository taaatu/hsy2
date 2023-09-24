import { Link, useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { useState } from 'react';

const HomePage = () => {
  const navigate = useNavigate();
  const [surveyKey, setSurveyKey] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/survey');
  };

  return (
    <div style={{ padding: '2em' }}>
      <div className={styles.main}>
        <h1>Home page</h1>
        <h1>HIMA</h1>
        <h3>Hiilijalanjäljen Minimointi Asuinkiinteistöissä</h3>
        <h4>Pääsykoodi</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            placeholder="Pääsykoodi"
            onChange={(e) => setSurveyKey(e.target.value)}
          />
          <button>Siirry kyselyyn</button>
        </form>
      </div>

      <Link to="/login">Kirjaudu/Login</Link>

      {/* <div className="column">
        <Link to="/survey">Survey answer</Link>
        <Link to="/survey/edit">Edit Survey</Link>
        <Link to="/create">Create Survey</Link>
        <Link to="/login">Login</Link>
        <Link to="/surveys">Surveys</Link>
        <Link to="/preview">Preview</Link>
        <Link to="/properties">Properties</Link>
        <Link to="/user-results">User Results</Link>
      </div> */}
    </div>
  );
};

export default HomePage;
