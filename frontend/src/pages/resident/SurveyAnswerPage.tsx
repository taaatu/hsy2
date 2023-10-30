import { useEffect, useState } from 'react';
import { Survey } from '../../interfaces/Survey';
import { AnswerSurveyForm } from '../../components/forms/AnswerSurveyForm';
import useSurvey from '../../hooks/SurveyHook';
import { useParams } from 'react-router-dom';

type Props = {
  isPreview: boolean;
};

export const SurveyAnswerPage = ({ isPreview }: Props) => {
  const [survey, setSurvey] = useState<Partial<Survey>>();
  const { surveyid } = useParams();
  const { getSurveyByKey } = useSurvey();

  useEffect(() => {
    (async () => {
      if (!surveyid) return;
      const _survey = await getSurveyByKey(surveyid);
      setSurvey(_survey);
    })();
  }, []);

  if (!survey) return <h1>Kyselyä ei löytynyt</h1>;

  return (
    <div>
      <AnswerSurveyForm
        survey={survey}
        isPreview={isPreview}
        surveyKey={surveyid}
      />
    </div>
  );
};
