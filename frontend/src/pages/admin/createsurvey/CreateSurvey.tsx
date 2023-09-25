import { useState } from 'react';
import AddQuestion from './AddQuestion.tsx';
import styles from './CreateSurvey.module.css';
// import { Survey } from '../../../data/Survey';
import {
  CITIES,
  ANSWER_1,
  ANSWER_2,
  ANSWER_3,
} from '../../../variables/Constants';
import { useNavigate } from 'react-router-dom';
import PreviewPage from '../preview/PreviewPage';
import { Survey } from '../../../interfaces/Survey';
import { Question } from '../../../interfaces/Question';
import SurveyAnswerPage from '../../resident/answer-survey/SurveyAnswerPage.js';

const CreateSurvey = () => {
  // let nextId = 1;
  const navigate = useNavigate();
  const [nextId, setNextId] = useState<number>(1); // [1, 2, 3, 4, 5
  const [questions, setQuestions] = useState<Partial<Question>[]>([
    { id: nextId, answer1: ANSWER_1, answer2: ANSWER_2, answer3: ANSWER_3 },
  ]);
  // const [survey, setSurvey] = useState({});
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: nextId + 1,
        answer1: ANSWER_1,
        answer2: ANSWER_2,
        answer3: ANSWER_3,
      },
    ]);
    setNextId(nextId + 1);
  };
  const [showPreview, setShowPreview] = useState(false);
  // const handleInputChange = (e, objPropertyName) => {
  //   const value = e.target.value;
  //   setSurvey({ ...survey, [objPropertyName]: value });
  // };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nSurvey: Partial<Survey> = {
      title: title,
      description: description,
      startDate: startTime,
      endDate: endTime,
      questions: questions as Question[],
    };
    console.log('Survey: ', nSurvey);
    alert('Kysely lähetetty');
    console.log('questions: ', questions);
  };
  if (showPreview) {
    const nSurvey: Partial<Survey> = {
      title: title,
      description: description,
      startDate: startTime,
      endDate: endTime,
      questions: questions as Question[],
    };
    return (
      <>
        <div className={styles.previewTop}>
          <button onClick={() => setShowPreview(false)}>
            Sulje esikatselu
          </button>
          <h4>Esikatselu</h4>
        </div>

        <SurveyAnswerPage survey={nSurvey} isPreview={true} />
        {/* <PreviewPage survey={nSurvey} />; */}
      </>
    );
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
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Kuvaus
          <textarea
            placeholder="Kuvaus"
            required
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Alkaa
          <input
            type="date"
            placeholder="Alkaa"
            required
            defaultValue={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>
        <label>
          Päättyy
          <input
            type="date"
            placeholder="Päättyy"
            required
            defaultValue={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </label>
        <select>
          {CITIES.map((city: string) => (
            <option key={city}>{city}</option>
          ))}
        </select>
        {/* <AddQuestion /> */}
        {`Kysymyksiä (${questions.length})`}
        {questions.map((question, index) => (
          <>
            <h4>Kysymys {index + 1}</h4>
            <AddQuestion
              key={question.id}
              setQuestions={setQuestions}
              questions={questions as Question[]}
              question={question}
            />
          </>
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
