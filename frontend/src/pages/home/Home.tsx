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
    <div>
      <div className={styles.main}>
        <AppName />
        <form onSubmit={handleSubmit} className="center-align">
          <input
            type="text"
            required
            className="medium line"
            placeholder="Pääsykoodi"
            onChange={(e) => setSurveyKey(e.target.value)}
          />

          <button style={{ marginTop: '1rem' }}>Siirry kyselyyn</button>
          <Link
            to="/login"
            style={{
              color: 'black',
              textDecoration: 'underline',
              fontWeight: 'normal',
              marginTop: '1rem',
            }}
          >
            Oletko isännöitsijä?
          </Link>
        </form>
        <HsyLogo />
      </div>
    </div>
  );
};
