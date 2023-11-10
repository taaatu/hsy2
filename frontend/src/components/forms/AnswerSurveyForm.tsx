import { useEffect, useState } from 'react';
import { Survey } from '../../interfaces/Survey';
import { Answer } from '../../interfaces/Answer';
import AnswerQuestion from './AnswerQuestion';
import useSurvey from '../../hooks/SurveyHook';
import { SuccessAlertModal } from '../SuccessAlertModal';
import { ButtonLoading } from '../ButtonLoading';

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
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPreview || !surveyKey) return;
    console.log('Answers: ', answers);
    const res = await submitAnswers(answers as Answer[], surveyKey);
    if (res) {
      setShowSuccessModal(true);
    } else {
      alert('Vastauksien lähettäminen epäonnistui!');
    }
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
    <div className="color3 rounded">
      <SuccessAlertModal
        show={showSuccessModal}
        message="Kysely on lähetetty"
        navRoute={`/survey/${surveyKey}/results`}
      />
      <div
        style={{ borderRadius: '0.5rem 0.5rem 0 0' }}
        className="color1 padding1"
      >
        <h2>{survey.survey_header?.survey_title ?? 'Ei nimeä'}</h2>
        <p style={{ whiteSpace: 'pre-line' }}>
          {survey.survey_header?.description ?? 'Ei kuvausta'}
        </p>
      </div>

      <h4 className="padding1">{`Kysymyksiä (${survey.questions?.length})`}</h4>
      <form
        onSubmit={handleSubmit}
        style={{ gap: '2rem' }}
        className="padding1"
      >
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

        <div style={{ alignSelf: 'center' }}>
          <ButtonLoading text="Lähetä vastaukset" />
        </div>
      </form>
    </div>
  );
};
