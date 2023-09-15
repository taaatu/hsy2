import PropTypes from 'prop-types';

// Component for adding questions to survey
const AddQuestion = ({ setQuestions, questions, question }) => {
  const removeQuestion = () => {
    setQuestions(questions.filter((q) => q.id !== question.id));
  };

  // Save input fields value on change to questions array state
  const handleInputChange = (e, objPropertyName) => {
    const value = e.target.value;
    setQuestions(
      questions.map((q) => {
        if (q.id === question.id) {
          return { ...q, [objPropertyName]: value };
        }
        return q;
      })
    );
  };
  return (
    <div>
      <h4>Kysymys {question.id}</h4>
      <input
        type="text"
        placeholder="Kysymys"
        required
        onChange={(e) => handleInputChange(e, 'text')}
      />
      <div className="column">
        <input
          type="text"
          placeholder="Vastaus 1"
          required
          onChange={(e) => handleInputChange(e, 'answer1')}
        />
        <input
          type="text"
          placeholder="Vastaus 2"
          required
          onChange={(e) => handleInputChange(e, 'answer2')}
        />
        <input
          type="text"
          placeholder="Vastaus 3"
          required
          onChange={(e) => handleInputChange(e, 'answer3')}
        />
        Painotus
        <div>
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
    </div>
  );
};

AddQuestion.propTypes = {
  setQuestions: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
  question: PropTypes.object.isRequired,
};

export default AddQuestion;
