import { useEffect, useState } from 'react';
import { Survey } from '../../interfaces/Survey';
import { AnswerSurveyForm } from '../../components/forms/AnswerSurveyForm';
import useSurvey from '../../hooks/SurveyHook';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {
  isPreview: boolean;
};

const SurveyAnswerPage = ({ isPreview }: Props) => {
  const [survey, setSurvey] = useState<Partial<Survey>>();
  const { surveyid } = useParams();
  const { getSurveyByKey, getResidentAnwers } = useSurvey();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!surveyid) return;
      const _survey = await getSurveyByKey(surveyid);
      // Check if survey is already been answered and navigate to results page
      if (!_survey && (await getResidentAnwers(surveyid)) !== undefined) {
        navigate(`/survey/${surveyid}/results`);
        return;
      }
      setSurvey(_survey);
    })();
  }, []);

  if (!survey) return <h1>Kyselyä ei löytynyt</h1>;

  return (
    <main style={{ maxWidth: '75ch', margin: 'auto' }}>
      <AnswerSurveyForm
        survey={survey}
        isPreview={isPreview}
        surveyKey={surveyid}
      />
    </main>
  );
};

export default SurveyAnswerPage;
