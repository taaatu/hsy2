import PropTypes from 'prop-types';
import styles from './CreateSurvey.module.css';
import { Dispatch, SetStateAction } from 'react';
import { ANSWER_1, ANSWER_2, ANSWER_3 } from '../../../variables/Constants';
import { Question } from '../../../interfaces/Question';

type Props = {
  setQuestions: Dispatch<SetStateAction<any>>;
  questions: Question[];
  question: Partial<Question>;
};
// Component for adding questions to survey
const AddQuestion = ({ setQuestions, questions, question }: Props) => {
  const removeQuestion = () =>
    setQuestions(
      questions.filter((q) => q.question_id !== question.question_id)
    );

  // Save input fields value on change to questions array state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuestions(
      questions.map((q) => {
        if (q.question_id === question.question_id) {
          return { ...q, [name]: value };
        }
        return q;
      })
    );
  };
  return (
    <div>
      {/* <h4>Kysymys {question.id}</h4> */}
      <input
        type="text"
        placeholder="Kysymys"
        required
        name="question"
        className={styles.input}
        defaultValue={question.question}
        onChange={handleInputChange}
      />
      <div className="column">
        <div className="center-align">
          <span className={styles.dot}>&#183;</span>
          <input
            className={styles.optionInput}
            type="text"
            defaultValue={ANSWER_1}
            placeholder="Vastaus 1"
            required
            name="option_1"
            onChange={handleInputChange}
          />
          <div>+1</div>
        </div>
        <div className="center-align">
          <span className={styles.dot}>&#183;</span>
          <input
            className={styles.optionInput}
            type="text"
            defaultValue={ANSWER_2}
            placeholder="Vastaus 2"
            required
            name="option_2"
            onChange={handleInputChange}
          />
          <div>+0,5</div>
        </div>
        <div className="center-align">
          <span className={styles.dot}>&#183;</span>
          <input
            className={styles.optionInput}
            type="text"
            defaultValue={ANSWER_3}
            placeholder="Vastaus 3"
            required
            name="option_3"
            onChange={handleInputChange}
          />
          <div>0</div>
        </div>
        {/* Painotus
        <div className={styles.selectWeight}>
          {[1, 2, 3, 4, 5].map((weight) => (
            <div key={weight}>
              {weight}
              <input
                type="radio"
                name={`weight-${question.id}`}
                value={weight}
                onChange={(e) => handleInputChange(e, 'weight')}
              />
            </div>
          ))}
        </div> */}
        {/* <input type="radio" name="question" value={1} required /> 1
          <input type="radio" name="question" value={1} required /> 2
          <input type="radio" name="question" value={1} required checked /> 3
          <input type="radio" name="question" value={1} required /> 4
          <input type="radio" name="question" value={1} required /> 5 */}

        <button style={{ backgroundColor: 'red' }} onClick={removeQuestion}>
          Poista
        </button>
      </div>
    </div>
  );
};

AddQuestion.propTypes = {
  setQuestions: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
  question: PropTypes.object.isRequired,
};

export default AddQuestion;
