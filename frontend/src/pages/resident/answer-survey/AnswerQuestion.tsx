import { Dispatch, SetStateAction, useState } from 'react';
import PropTypes from 'prop-types';
import { Question } from '../../../interfaces/Question';
import { Answer } from '../../../interfaces/Answer';

type Props = {
  question: Partial<Question>;
  index: number;
  answers: Partial<Answer>[];
  setAnswers: Dispatch<SetStateAction<Partial<Answer>[]>>;
};

const AnswerQuestion = ({ question, index, answers, setAnswers }: Props) => {
  const [answer, setAnswer] = useState<string>();

  // Update answers array whem answer is selected from radio buttons
  const changeAnswer = (answer: string) => {
    console.log('answer: ', answer);
    setAnswers(
      answers.map((a, i) => {
        if (a.question === question.question) {
          return { ...a, answer: answer };
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
            value={question.option_3}
            // onChange={() => setAnswer(question.answer3)}
            onChange={() => changeAnswer(question.option_3 ?? '')}
            // checked={answer === 3}
            required
          />{' '}
          {question.option_3}
        </div>
      </div>
      {/* <h4>vastaus {answer}</h4> */}
    </>
  );
};

// AnswerQuestion.propTypes = {
//   question: PropTypes.object.isRequired,
// };

export default AnswerQuestion;
