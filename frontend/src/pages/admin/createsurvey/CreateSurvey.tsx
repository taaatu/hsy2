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
    {
      question_id: nextId,
      option_1: ANSWER_1,
      option_2: ANSWER_2,
      option_3: ANSWER_3,
    },
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
        question_id: nextId + 1,
        option_1: ANSWER_1,
        option_2: ANSWER_2,
        option_3: ANSWER_3,
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
    <div className="createsurvey">
      <h1>Create Survey</h1>
      <form onSubmit={handleSubmit} className="createsurveystuff">
        <label className="createsurveything">
          Kyselyn nimi
          <input
            className="createsurveything"
            type="text"
            placeholder="Kyselyn nimi"
            required
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="createsurveything">
          Kuvaus
          <textarea
            placeholder="Kuvaus"
            required
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className="createsurveything">
          Alkaa
          <input
            type="date"
            placeholder="Alkaa"
            required
            defaultValue={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>
        <label className="createsurveything">
          Päättyy
          <input
            type="date"
            placeholder="Päättyy"
            required
            defaultValue={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </label>
        <select className="createsurveything">
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
              key={question.question_id}
              setQuestions={setQuestions}
              questions={questions as Question[]}
              question={question}
            />
          </>
        ))}
        <p className="createsurveybuttons">
          <button type="button" onClick={addQuestion} className="hehe">
            Lisää kysymys
          </button>
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="hehe"
          >
            Esikatsele
          </button>
        </p>
        <input type="submit" value="Luo kysely" className="createsurveything" />
      </form>
    </div>
  );
};

export default CreateSurvey;
