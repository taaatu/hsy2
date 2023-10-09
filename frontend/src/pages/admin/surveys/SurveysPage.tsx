// Page that displays all surveys
import { useEffect, useState } from 'react';
import useSurvey from '../../../hooks/SurveyHook';
import { SurveyHeader } from '../../../interfaces/Survey';
import { Link } from 'react-router-dom';

const SurveysPage = () => {
  const { getSurveys } = useSurvey();
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
    <div>
      <h1>Surveys Page</h1>
      <label>
        <input onChange={handleSearch} type="text" />
      </label>

      <h4>{`Kyselyt (${surveys.length})`}</h4>
      {surveys.map((survey) => (
        <div style={{ backgroundColor: 'white', padding: '1em' }}>
          <Link to={`/admin/surveys/${survey.survey_id}`}>
            {survey.survey_title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SurveysPage;
