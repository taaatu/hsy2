import { Dispatch, SetStateAction } from 'react';
import { Question } from '../../interfaces/Question';
import { Answer } from '../../interfaces/Answer';

type Props = {
  question: Partial<Question>;
  index: number;
  answers: Partial<Answer>[];
  setAnswers: Dispatch<SetStateAction<Partial<Answer>[]>>;
  isPreview?: boolean;
};

const AnswerQuestion = ({
  question,
  index,
  answers,
  setAnswers,
  isPreview,
}: Props) => {
  // const [answer, setAnswer] = useState<string>();

  // Update answers array whem answer is selected from radio buttons
  const changeAnswer = (answer: string) => {
    console.log('answer: ', answer);
    setAnswers(
      answers.map((a, _) => {
        if (a.q_id === question.question_id) {
          return { ...a, selected_option: answer };
        }
        return a;
      })
    );
  };

  return (
    <>
      <div className="column">
        <h4>
          {index + 1}. {question.question}
        </h4>
        <div>
          <input
            type="radio"
            name={question.question}
            disabled={isPreview}
            value={question.option_1}
            // onChange={() => setAnswer(question.answer1)}
            onChange={() => changeAnswer(question.option_1 ?? '')}
            // checked={answer === 1}
            required
          />{' '}
          {question.option_1}
        </div>
        <div>
          <input
            type="radio"
            name={question.question}
            disabled={isPreview}
            value={question.option_2}
            // onChange={() => setAnswer(question.answer2)}
            onChange={() => changeAnswer(question.option_2 ?? '')}
            // checked={answer === 2}
            required
          />{' '}
          {question.option_2}
        </div>
        <div>
          <input
            type="radio"
            name={question.question}
            disabled={isPreview}
            value={question.option_3}
            onChange={() => changeAnswer(question.option_3 ?? '')}
            required
          />{' '}
          {question.option_3}
        </div>
      </div>
    </>
  );
};

export default AnswerQuestion;
