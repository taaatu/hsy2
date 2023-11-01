import { useParams } from 'react-router-dom';
import useSurvey from '../../../hooks/SurveyHook';
import { useEffect, useState } from 'react';
import { AssignedSurvey } from '../../../interfaces/Survey';
import { ButtonLoading } from '../../../components/ButtonLoading';

const ManagerSingleSurveyPage = () => {
  const { surveyid } = useParams();
  const [survey, setSurvey] = useState<AssignedSurvey>();
  const [surveyKeys, setSurveyKeys] = useState<string[]>([]);
  const { createSurveyKeys, getAssignedSurveys, getSurveyKeys } = useSurvey();

  const handleCreateKey = async () => {
    if (!survey) return;
    await createSurveyKeys(survey.assigned_survey_id);
    setSurveyKeys(await getSurveyKeys(survey.assigned_survey_id));
  };

  useEffect(() => {
    (async () => {
      const _surveys = await getAssignedSurveys();
      const _survey = _surveys?.find(
        (survey) => survey.assigned_survey_id === Number(surveyid)
      );
      if (!_survey) return;
      setSurvey(_survey);
      setSurveyKeys(await getSurveyKeys(_survey?.assigned_survey_id));
    })();
  }, []);

  return (
    <main>
      <h4>{survey?.survey_title}</h4>
      <ButtonLoading text="Luo koodi" onClick={handleCreateKey} />
      <ul style={{ backgroundColor: 'white' }}>
        <h4>Käyttämättömät koodit {`(${surveyKeys.length})`}</h4>
        {surveyKeys.map((key) => (
          <li key={key}>{key}</li>
        ))}
      </ul>
    </main>
  );
};

export default ManagerSingleSurveyPage;
