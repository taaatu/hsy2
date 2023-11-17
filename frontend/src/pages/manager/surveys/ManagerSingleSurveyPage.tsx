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
  const { getAssignedSurveys } = useSurvey();
  // const { curentUser } = useContext(MainContext);

  useEffect(() => {
    (async () => {
      const _surveys = await getAssignedSurveys();
      const _survey = _surveys?.find(
        (survey) => survey.assigned_survey_id === Number(id)
      );
      if (!_survey) return;
      setSurvey(_survey);
    })();
  }, []);

  if (survey)
    return (
      <main className="color3 margin1 column">
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
            <CreateKey surveyid={survey?.assigned_survey_id} />
          </Tab>
        </Tabs>
      </main>
    );
};

const CreateKey = ({ surveyid }: { surveyid: number }) => {
  const [surveyKeys, setSurveyKeys] = useState<string[]>([]);
  const { createSurveyKeys, getSurveyKeys } = useSurvey();
  const [keyAmount, setKeyAmount] = useState<number>(1);

  const handleCreateKey = async (e: any) => {
    e.preventDefault();
    if (!surveyid) return;
    await createSurveyKeys(surveyid, keyAmount);
    setSurveyKeys(await getSurveyKeys(surveyid));
  };

  useEffect(() => {
    (async () => {
      setSurveyKeys(await getSurveyKeys(surveyid));
    })();
  }, [surveyid]);

  return (
    <>
      <form onSubmit={handleCreateKey} className="flex-row">
        <label>
          Koodien määrä
          <input
            placeholder="Koodien määrä"
            className="line"
            style={{ width: '10ch' }}
            defaultValue={keyAmount}
            min={1}
            max={100}
            onChange={(e) => setKeyAmount(Number(e.target.value))}
            type="number"
          />
        </label>

        <ButtonLoading text="Luo koodi" />
      </form>

      <ul>
        <h4>Käyttämättömät koodit {`(${surveyKeys.length})`}</h4>
        {surveyKeys.map((key) => (
          <li className='kooditlista' key={key}>{key}</li>
        ))}
      </ul>
    </>
  );
};

export default ManagerSingleSurveyPage;
