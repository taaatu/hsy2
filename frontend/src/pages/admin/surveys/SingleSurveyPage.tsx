import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSurvey from '../../../hooks/SurveyHook';
import { AssignedSurvey, Survey } from '../../../interfaces/Survey';
import { SurveyPreview } from '../../../components/SurveyPreview';
import { LoadingList } from '../../../components/lists/LoadingList';

const SingleSurveyPage = () => {
  const { surveyid } = useParams();
  const { getSurveyById, deleteSurvey, getAssignedSurveys } = useSurvey();
  const [survey, setSurvey] = useState<Survey>();
  const [assignedSurveys, setAssignedSurveys] = useState<AssignedSurvey[]>([]);

  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!surveyid) return;
    if (!confirm('Haluatko varmasti poistaa kyselyn?')) return;
    await deleteSurvey(surveyid);
  };

  const fetchSurvey = async () => {
    if (!surveyid) return;
    const res = await getSurveyById(surveyid);
    setSurvey(res);
  };

  useEffect(() => {
    fetchSurvey();
    (async () => {
      const _assignedSurveys = await getAssignedSurveys();
      const _filtered = _assignedSurveys.filter(
        (s) => s.survey_id === Number(surveyid)
      );
      setAssignedSurveys(_filtered);
    })();
  }, []);

  if (!survey) return <h1>Ei kyselyä</h1>;

  return (
    <main>
      <h1>{survey.survey_header.survey_title}</h1>
      <SurveyPreview survey={survey} />
      <button className="delete" onClick={handleDelete}>
        Poista kysely
      </button>
      <button
        className="colored"
        onClick={() =>
          navigate('/admin/surveys/create/' + survey.survey_header.survey_id)
        }
      >
        Luo kopio
      </button>
      <h1>Assigned surveys list</h1>
      <LoadingList>
        {assignedSurveys.map((survey) => (
          <div key={survey.assigned_survey_id} className="list-item">
            <h4 style={{ flex: 1 }}>{survey.survey_title}</h4>
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

export default SingleSurveyPage;
