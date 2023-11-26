import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AssignedSurvey, Survey } from '../../../interfaces/Survey';
import useSurvey from '../../../hooks/SurveyHook';
import { SurveyPreview } from '../../../components/SurveyPreview';
import { SelectProperties } from './SelectProperties';
import { AssignedSurveyList } from '../../../components/lists/AssignedSurveyList';

const ManagerBaseSurveyPage = () => {
  const { surveyid } = useParams();
  const { getSurveyById, getAssignedSurveys } = useSurvey();
  const [survey, setSurvey] = useState<Survey>();
  const [assignedSurveys, setAssignedSurveys] = useState<AssignedSurvey[]>([]);

  useEffect(() => {
    (async () => {
      if (!surveyid) return;
      setSurvey(await getSurveyById(surveyid));
      const _assignedSurveys = await getAssignedSurveys();
      const _filtered = _assignedSurveys.filter(
        (s) => s.survey_id === Number(surveyid)
      );
      setAssignedSurveys(_filtered);
    })();
  }, []);

  if (!survey) return <h1>Ei kyselyä</h1>;

  return (
    <main className="column">
      <div className="flex-row">
        <SelectProperties
          surveyid={Number(surveyid)}
          assignedSurveys={assignedSurveys}
        />

        <SurveyPreview survey={survey} />
      </div>
      <AssignedSurveyList surveyid={Number(surveyid)} />
    </main>
  );
};

export default ManagerBaseSurveyPage;
