import { useEffect, useState } from 'react';
import { Survey } from '../../interfaces/Survey';
import { Answer } from '../../interfaces/Answer';
import AnswerQuestion from './AnswerQuestion';
import useSurvey from '../../hooks/SurveyHook';

type Props = {
  survey: Partial<Survey>;
  isPreview?: boolean;
  surveyKey?: string;
};

export const AnswerSurveyForm = ({
  survey,
  isPreview = false,
  surveyKey,
}: Props) => {
  const [answers, setAnswers] = useState<Partial<Answer>[]>([]);
  const { submitAnswers } = useSurvey();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPreview || !surveyKey) return;
    console.log('Answers: ', answers);
    await submitAnswers(answers as Answer[], surveyKey);
  };

  useEffect(() => {
    if (isPreview) return;
    const _questions = survey.questions?.map((q) => ({
      q_id: q.question_id,
    })) as Partial<Answer>[];
    console.log('s: ', _questions);
    setAnswers(_questions);
  }, [survey]);

  return (
    <div className="survey-bg">
      <h2>{survey.survey_header?.survey_title ?? 'Ei nimeä'}</h2>
      <p>{survey.survey_header?.description ?? 'Ei kuvausta'}</p>
      <h4>{`Kysymyksiä (${survey.questions?.length})`}</h4>
      <form onSubmit={handleSubmit} style={{ gap: '2rem' }}>
        {survey.questions !== undefined && (
          <>
            {survey.questions.map((question, index) => (
              <AnswerQuestion
                key={question.question_id}
                question={question}
                index={index}
                answers={answers}
                setAnswers={setAnswers}
                isPreview={isPreview}
              />
            ))}
          </>
        )}
        <input
          style={{ width: 'fit-content' }}
          type="submit"
          value="Lähetä vastaukset"
          disabled={isPreview}
        />
      </form>
    </div>
  );
};
