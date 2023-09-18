import { useState } from 'react';
import AddQuestion from './AddQuestion';
import {
  SURVEY_DESCRIPTION,
  SURVEY_END_TIME,
  SURVEY_START_TIME,
  SURVEY_TITLE,
} from '../../../variables/PropertyNames';
import styles from './CreateSurvey.module.css';

const CreateSurvey = () => {
  // let nextId = 1;
  const [nextId, setNextId] = useState(1); // [1, 2, 3, 4, 5
  const [questions, setQuestions] = useState([{ id: nextId }]);
  const [survey, setSurvey] = useState({});
  const addQuestion = () => {
    setQuestions([...questions, { id: nextId + 1 }]);
    setNextId(nextId + 1);
  };
  const handleInputChange = (e, objPropertyName) => {
    const value = e.target.value;
    setSurvey({ ...survey, [objPropertyName]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Kysely lähetetty');
    console.log('questions: ', questions);
    console.log('survey: ', survey);
  };
  return (
    <div>
      <h1>Create Survey</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Kyselyn nimi
          <input
            type="text"
            placeholder="Kyselyn nimi"
            required
            onChange={(e) => handleInputChange(e, SURVEY_TITLE)}
          />
        </label>
        <label>
          Kuvaus
          <textarea
            type="text"
            placeholder="Kuvaus"
            required
            onChange={(e) => handleInputChange(e, SURVEY_DESCRIPTION)}
          />
        </label>
        <label>
          Alkaa
          <input
            type="date"
            placeholder="Alkaa"
            required
            onChange={(e) => handleInputChange(e, SURVEY_START_TIME)}
          />
        </label>
        <label>
          Päättyy
          <input
            type="date"
            placeholder="Päättyy"
            required
            onChange={(e) => handleInputChange(e, SURVEY_END_TIME)}
          />
        </label>
        {/* <AddQuestion /> */}
        Kysymyksiä: {questions.length}
        {questions.map((question) => (
          <AddQuestion
            key={question.id}
            setQuestions={setQuestions}
            questions={questions}
            question={question}
          />
        ))}
        <button type="button" onClick={addQuestion}>
          Lisää kysymys
        </button>
        <input type="submit" value="Esikatsele" />
      </form>
    </div>
  );
};

export default CreateSurvey;
