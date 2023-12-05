import {
  AssignedSurveyResults,
  BaseSurveyResults,
} from '../../interfaces/SurveyResults';
import { getTopQuestionsByPoints } from '../../utils/Functions';

type Props = {
  results: AssignedSurveyResults | BaseSurveyResults;
};

export const QuestionsByPoints = ({ results }: Props) => {
  return (
    <section
      className="column padding1"
      style={{ flex: 1, backgroundColor: 'lightgray' }}
    >
      <div className="column">
        <h5>Eniten pisteitä keränneet kysymykset:</h5>
        {getTopQuestionsByPoints(results.survey_questions_statistics).top.map(
          (question, index) => (
            <span key={index}>
              {index + 1}. {question.question}, {question.points}
            </span>
          )
        )}
      </div>
      <div className="column">
        <h5>Vähiten pisteitä keränneet kysymykset:</h5>
        {getTopQuestionsByPoints(
          results.survey_questions_statistics
        ).bottom.map((question, index) => (
          <span key={index}>
            {index + 1}. {question.question}, {question.points}
          </span>
        ))}
      </div>
    </section>
  );
};
