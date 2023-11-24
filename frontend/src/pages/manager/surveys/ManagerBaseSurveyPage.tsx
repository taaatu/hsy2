import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AssignedSurvey, Survey } from '../../../interfaces/Survey';
import useSurvey from '../../../hooks/SurveyHook';
import { SurveyPreview } from '../../../components/SurveyPreview';
import { SelectProperties } from './SelectProperties';
import { LoadingList } from '../../../components/lists/LoadingList';

const ManagerBaseSurveyPage = () => {
  const { surveyid } = useParams();
  const { getSurveyById, getAssignedSurveys } = useSurvey();
  const [survey, setSurvey] = useState<Survey>();
  const navigate = useNavigate();
  // --------------------------------------------------------
  const [assignedSurveys, setAssignedSurveys] = useState<AssignedSurvey[]>([]);
  const [update, setUpdate] = useState(0);

  const handleUpdate = () => setUpdate(update + 1);

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
  }, [update]);

  if (!survey) return <h1>Ei kyselyä</h1>;

  return (
    <main className="column">
      <div className="flex-row">
        <SelectProperties
          surveyid={Number(surveyid)}
          assignedSurveys={assignedSurveys}
          handleUpdate={handleUpdate}
        />

        <SurveyPreview survey={survey} />
      </div>

      <LoadingList>
        {assignedSurveys.map((survey) => (
          <div key={survey.assigned_survey_id} className="list-item">
            <div style={{ flex: 1 }}>{survey.survey_title}</div>
            <div style={{ flex: 1 }}>
              {survey.street}, {survey.post_code}, {survey.city}
            </div>
            <button
              onClick={() =>
                navigate(
                  `/manager/surveys/${surveyid}/assigned/${survey.assigned_survey_id}`
                )
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

export default ManagerBaseSurveyPage;
