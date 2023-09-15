import Question from './Question';

const SurveyAnswerPage = () => {
  // const [answer, setAnswer] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Kysely lähetetty');
  };
  return (
    <div className="survey-bg">
      <h1>Survey answer Page</h1>
      <h2>Kysely 1</h2>
      <p>Jotain tekstiä</p>
      <form onSubmit={handleSubmit}>
        <Question question="Suljetko valot asunnosta poistuessa?" />
        <Question question="Käytkö usein saunassa?" />
        <input type="submit" value="Lähetä" />
      </form>
    </div>
  );
};

export default SurveyAnswerPage;
