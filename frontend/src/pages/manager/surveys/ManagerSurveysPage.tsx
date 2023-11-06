import { useEffect, useState } from 'react';
import { AssignedSurvey } from '../../../interfaces/Survey';
import useSurvey from '../../../hooks/SurveyHook';
import { SearchBar } from '../../../components/SearchBar';
import { useNavigate } from 'react-router-dom';
import { LoadingList } from '../../../components/lists/LoadingList';

const ManagerSurveysPage = () => {
  const [surveys, setSurveys] = useState<AssignedSurvey[]>([]);
  const { getAssignedSurveys } = useSurvey();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredSurveys = surveys.filter((survey) => {
    return (
      survey.survey_title.toLowerCase().includes(search.toLowerCase()) ||
      survey.street.toLowerCase().includes(search.toLowerCase()) ||
      survey.post_code.toLowerCase().includes(search.toLowerCase()) ||
      survey.city.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  useEffect(() => {
    (async () => {
      setSurveys(await getAssignedSurveys());
    })();
  }, []);

  return (
    <main className="column">
      <h1>Kyselyt</h1>
      <SearchBar placeholder="Hae kyselyitä" handleSearch={handleSearch} />

      <LoadingList>
        {filteredSurveys.map((survey) => (
          <div key={survey.assigned_survey_id} className="list-item">
            <h4 style={{ flex: 1 }}>{survey.survey_title}</h4>
            <div style={{ flex: 1 }}>
              {survey.street}, {survey.post_code}, {survey.city}
            </div>
            <button
              onClick={() =>
                navigate('/manager/surveys/' + survey.assigned_survey_id)
              }
            >
              Siirry
            </button>
          </div>
        ))}
      </LoadingList>
    </main>
  );
};

export default ManagerSurveysPage;
