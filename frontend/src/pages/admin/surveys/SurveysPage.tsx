// Page that displays all surveys
import { useEffect, useState } from 'react';
import useSurvey from '../../../hooks/SurveyHook';
import { SurveyHeader } from '../../../interfaces/Survey';
import { useNavigate } from 'react-router-dom';
import styles from './Surveys.module.css';
import { SearchBar } from '../../../components/SearchBar';

const SurveysPage = () => {
  const { getSurveys } = useSurvey();
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState<SurveyHeader[]>([]);
  const [fullList, setFullList] = useState<SurveyHeader[]>([]);

  const fetchSurveys = async () => {
    const surveys = await getSurveys();
    if (!surveys) return;
    setSurveys(surveys);
    setFullList(surveys);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    const filteredSurveys = fullList.filter((survey) =>
      survey.survey_title.toLowerCase().includes(search.toLowerCase())
    );
    setSurveys(filteredSurveys);
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  return (
    <div className={styles.container}>
      <div
        style={{ marginBottom: '1em', gap: '1rem', flexWrap: 'wrap' }}
        className="flex-row center-align"
      >
        <SearchBar placeholder="Hae kyselyitä" handleSearch={handleSearch} />
        <button onClick={() => navigate('/admin/surveys/create')}>
          Luo uusi kysely
        </button>
      </div>

      <h4>{`Kyselyt (${surveys.length})`}</h4>
      <div className={styles.surveyList}>
        {surveys.map((survey) => (
          <div key={survey.survey_id} className={styles.listItem}>
            <div>{survey.survey_title}</div>
            <button
              onClick={() => navigate(`/admin/surveys/${survey.survey_id}`)}
            >
              Siirry
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveysPage;
