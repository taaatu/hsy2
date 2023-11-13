import { useParams } from 'react-router-dom';
import useSurvey from '../../../hooks/SurveyHook';
import { useEffect, useState } from 'react';
import { AssignedSurvey } from '../../../interfaces/Survey';
import { ButtonLoading } from '../../../components/ButtonLoading';
import Tabs from 'react-bootstrap/esm/Tabs';
import { Tab } from 'react-bootstrap';
import { SurveyResults } from './results/SurveyResults';

const ManagerSingleSurveyPage = () => {
  const { id } = useParams();
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
        (survey) => survey.assigned_survey_id === Number(id)
      );
      if (!_survey) return;
      setSurvey(_survey);
      setSurveyKeys(await getSurveyKeys(_survey?.assigned_survey_id));
    })();
  }, []);

  return (
    <main className="color3 margin1">
      <h4>{survey?.survey_title}</h4>
      <div>{survey?.building_name}</div>
      <div>
        {survey?.street}, {survey?.post_code}, {survey?.city}
      </div>
      <div>
        Vastausaika: {survey?.start_time} - {survey?.end_time}
      </div>
      <Tabs>
        <Tab eventKey="vastaukset" title="Vastaukset">
          {survey?.assigned_survey_id && (
            <SurveyResults surveyId={survey?.assigned_survey_id} />
          )}
        </Tab>
        <Tab eventKey="kysely" title="Jaa kysely">
          <ButtonLoading text="Luo koodi" onClick={handleCreateKey} />
          <ul style={{ backgroundColor: 'white' }}>
            <h4>Käyttämättömät koodit {`(${surveyKeys.length})`}</h4>
            {surveyKeys.map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        </Tab>
      </Tabs>
    </main>
  );
};

export default ManagerSingleSurveyPage;
