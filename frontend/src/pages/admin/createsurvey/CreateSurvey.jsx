import { useState } from 'react';
import AddQuestion from './AddQuestion';
import styles from './CreateSurvey.module.css';
import { Survey } from '../../../data/Survey';
import { CITIES } from '../../../variables/Constants';
import { useNavigate } from 'react-router-dom';
import PreviewPage from '../preview/PreviewPage';

const CreateSurvey = () => {
  // let nextId = 1;
  const navigate = useNavigate();
  const [nextId, setNextId] = useState(1); // [1, 2, 3, 4, 5
  const [questions, setQuestions] = useState([{ id: nextId }]);
  // const [survey, setSurvey] = useState({});
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const addQuestion = () => {
    setQuestions([...questions, { id: nextId + 1 }]);
    setNextId(nextId + 1);
  };
  const [showPreview, setShowPreview] = useState(false);
  // const handleInputChange = (e, objPropertyName) => {
  //   const value = e.target.value;
  //   setSurvey({ ...survey, [objPropertyName]: value });
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    const mSurvey = new Survey(
      title,
      description,
      startTime,
      endTime,
      questions
    );
    console.log('Survey: ', mSurvey);
    alert('Kysely lähetetty');
    console.log('questions: ', questions);
    // navigate('/preview');
    // console.log('survey: ', survey);
  };
  if (showPreview) {
    const mSurvey = new Survey(
      title,
      description,
      startTime,
      endTime,
      questions
    );
    return <PreviewPage survey={mSurvey} />;
  }
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
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Kuvaus
          <textarea
            placeholder="Kuvaus"
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Alkaa
          <input
            type="date"
            placeholder="Alkaa"
            required
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>
        <label>
          Päättyy
          <input
            type="date"
            placeholder="Päättyy"
            required
            onChange={(e) => setEndTime(e.target.value)}
          />
        </label>
        <select>
          {CITIES.map((city) => (
            <option key={city}>{city}</option>
          ))}
          {/* <option value="1">Helsinki</option>
          <option value="2">Espoo</option>
          <option value="3">Vantaa</option> */}
        </select>
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
        <button type="button" onClick={() => setShowPreview(true)}>
          Esikatsele
        </button>
        <input type="submit" value="Luo kysely" />
      </form>
    </div>
  );
};

export default CreateSurvey;
