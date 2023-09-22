import Question from './Question';
import PropTypes from 'prop-types';

const SurveyAnswerPage = ({ survey }) => {
  // const [answer, setAnswer] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Kysely lähetetty');
  };
  return (
    <div className="survey-bg">
      <h1>Survey answer Page</h1>
      <h2>{survey.title}</h2>
      <p>{survey.description}</p>
      <p>Jotain tekstiä</p>
      <form onSubmit={handleSubmit}>
        {survey.questions.map((question) => (
          <Question key={question.id} question={question} />
        ))}
        <input type="submit" value="Lähetä" />
      </form>
    </div>
  );
};

SurveyAnswerPage.propTypes = {
  survey: PropTypes.object.isRequired,
};

export default SurveyAnswerPage;
