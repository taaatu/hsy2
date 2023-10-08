// Page that displays all surveys
import { useEffect, useState } from 'react';
import useSurvey from '../../../hooks/SurveyHook';
import { Survey } from '../../../interfaces/Survey';

const SurveysPage = () => {
  const { getSurveys } = useSurvey();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [fullList, setFullList] = useState<Survey[]>([]);

  const fetchSurveys = async () => {
    // const surveys = await getSurveys();
    // console.log('Surveys: ', surveys);
    // if (!surveys) return;
    // setSurveys(surveys);
    // setFullList(surveys);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    const filteredSurveys = fullList.filter(
      (survey) => survey.title.toLowerCase().includes(search.toLowerCase()) //||
      // user.company.toLowerCase().includes(search.toLowerCase())
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
        <div>
          <h3>{survey.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default SurveysPage;
