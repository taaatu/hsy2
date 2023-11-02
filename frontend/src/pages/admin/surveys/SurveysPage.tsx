// Page that displays all surveys
import { useEffect, useState } from 'react';
import useSurvey from '../../../hooks/SurveyHook';
import { SurveyHeader } from '../../../interfaces/Survey';
import { useNavigate } from 'react-router-dom';
import styles from './Surveys.module.css';
import { SearchBar } from '../../../components/SearchBar';
import { LoadingList } from '../../../components/lists/LoadingList';

const SurveysPage = () => {
  const { getSurveys } = useSurvey();
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState<SurveyHeader[]>([]);
  const [search, setSearch] = useState('');

  const filteredSurveys = surveys.filter((survey) => {
    return survey.survey_title.toLowerCase().includes(search.toLowerCase());
  });

  const fetchSurveys = async () => {
    const surveys = await getSurveys();
    if (!surveys) return;
    setSurveys(surveys);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  useEffect(() => {
    fetchSurveys();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Kyselyt</h1>
      <div className="sticky-header">
        <div
          style={{ marginBottom: '1em', gap: '1rem', flexWrap: 'wrap' }}
          className="flex-row center-align"
        >
          <SearchBar placeholder="Hae kyselyitä" handleSearch={handleSearch} />
          <button
            onClick={() => navigate('/admin/surveys/create')}
            style={{ backgroundColor: 'aquamarine' }}
          >
            Luo uusi kysely
          </button>
        </div>
      </div>

      <LoadingList>
        {filteredSurveys.map((survey) => (
          <div key={survey.survey_id} className={styles.listItem}>
            <div>{survey.survey_title}</div>
            <button
              onClick={() => navigate(`/admin/surveys/${survey.survey_id}`)}
            >
              Siirry
            </button>
          </div>
        ))}
      </LoadingList>
    </div>
  );
};

export default SurveysPage;
