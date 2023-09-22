import { useState } from 'react';
import PropTypes from 'prop-types';

const Question = ({ question }) => {
  const [answer, setAnswer] = useState();

  return (
    <>
      <div className="column">
        <h4>{question.question}</h4>
        <div>
          <input
            type="radio"
            name={question.Question}
            value={1}
            onChange={() => setAnswer(1)}
            checked={answer === 1}
            required
          />{' '}
          {question.answer1}
        </div>
        <div>
          <input
            type="radio"
            name={question.Question}
            value={2}
            onChange={() => setAnswer(2)}
            checked={answer === 2}
            required
          />{' '}
          {question.answer2}
        </div>
        <div>
          <input
            type="radio"
            name={question.Question}
            value={3}
            onChange={() => setAnswer(3)}
            checked={answer === 3}
            required
          />{' '}
          {question.answer3}
        </div>
      </div>
      <h4>vastaus {answer}</h4>
    </>
  );
};

Question.propTypes = {
  question: PropTypes.object.isRequired,
};

export default Question;
