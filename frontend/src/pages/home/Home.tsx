import { Link, useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { useState } from 'react';
import { AppName } from '../../components/AppName';
import { HsyLogo } from '../../components/HsyLogo';

export const HomePage = () => {
  const navigate = useNavigate();
  const [surveyKey, setSurveyKey] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/survey/' + surveyKey);
  };

  return (
    <div style={{}}>
      <div className={styles.main}>
        <AppName />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            placeholder="Pääsykoodi"
            onChange={(e) => setSurveyKey(e.target.value)}
          />

          <button className="buttonloginandhome">Siirry kyselyyn</button>
        </form>
        <HsyLogo />
      </div>
      <Link to="/login" className="linktologin">
        Kirjaudu/Login
      </Link>
    </div>
  );
};
