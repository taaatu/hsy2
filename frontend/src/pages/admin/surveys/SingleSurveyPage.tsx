import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSurvey from '../../../hooks/SurveyHook';
import { Survey } from '../../../interfaces/Survey';
import { SurveyPreview } from '../../../components/SurveyPreview';

export const SingleSurveyPage = () => {
  const { surveyid } = useParams();
  const { getSurveyById } = useSurvey();
  const [survey, setSurvey] = useState<Survey>();

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
      <button className="delete">Poista kysely</button>
    </div>
  );
};
