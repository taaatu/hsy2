import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSurvey from '../../../hooks/SurveyHook';
import { Survey } from '../../../interfaces/Survey';
import { SurveyPreview } from '../../../components/SurveyPreview';

const SingleSurveyPage = () => {
  const { surveyid } = useParams();
  const { getSurveyById, deleteSurvey } = useSurvey();
  const [survey, setSurvey] = useState<Survey>();
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
  }, []);

  if (!survey) return <h1>Ei kyselyä</h1>;

  return (
    <div>
      <h1>{survey.survey_header.survey_title}</h1>
      <SurveyPreview survey={survey} />
      <button className="delete" onClick={handleDelete}>
        Poista kysely
      </button>
      <button
        onClick={() =>
          navigate('/admin/surveys/create/' + survey.survey_header.survey_id)
        }
      >
        Luo kopio
      </button>
    </div>
  );
};

export default SingleSurveyPage;
