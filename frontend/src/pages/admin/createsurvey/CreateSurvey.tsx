import { useEffect, useState } from 'react';
import AddQuestion from './AddQuestion';
import { ANSWER_1, ANSWER_2, ANSWER_3 } from '../../../variables/Constants';
import { useNavigate, useParams } from 'react-router-dom';
import { Survey, SurveyHeader } from '../../../interfaces/Survey';
import { Question } from '../../../interfaces/Question';
import useSurvey from '../../../hooks/SurveyHook.js';
import { SelectProperties } from './SelectProperties.js';
import { SurveyPreview } from '../../../components/SurveyPreview.js';
import { ButtonLoading } from '../../../components/ButtonLoading';
import styles from './CreateSurvey.module.css';
import { set } from 'date-fns';

const CreateSurvey = () => {
  const navigate = useNavigate();
  const { surveyid } = useParams();
  const [nextId, setNextId] = useState<number>(1);
  const [questions, setQuestions] = useState<Partial<Question>[]>([
    {
      question_id: nextId,
      option_1: ANSWER_1,
      option_2: ANSWER_2,
      option_3: ANSWER_3,
    },
  ]);
  // const [survey, setSurvey] = useState({});
  const [surveyHeader, setSurveyHeader] = useState<Partial<SurveyHeader>>({
    u_id: 27,
  });

  const { createSurvey, getSurveyById } = useSurvey();
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

  const handleHeaderChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSurveyHeader({
      ...surveyHeader,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nSurvey: Survey = {
      survey_header: surveyHeader as SurveyHeader,
      questions: questions as Question[],
    };
    console.log('questions: ', questions);
    console.log('surveyHeader: ', surveyHeader);
    console.log('nSurvey: ', nSurvey);
    await createSurvey(nSurvey as Survey);
  };

  useEffect(() => {
    console.log('surveyid: ', surveyid);
    if (!surveyid) return;
    (async () => {
      const _survey = await getSurveyById(surveyid);
      if (!_survey) return;
      setSurveyHeader(_survey.survey_header);
      setQuestions(_survey.questions);
    })();
  }, []);

  return (
    <div className={styles.createSurvey}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className="createsurveything">
          Kyselyn nimi
          <input
            className="createsurveything"
            type="text"
            placeholder="Kyselyn nimi"
            required
            name="survey_title"
            defaultValue={surveyHeader.survey_title}
            onChange={handleHeaderChange}
          />
        </label>
        <label className="createsurveything">
          Kuvaus
          <textarea
            placeholder="Kuvaus"
            required
            name="description"
            defaultValue={surveyHeader.description}
            onChange={handleHeaderChange}
          />
        </label>
        <label className="createsurveything">
          Alkaa
          <input
            type="date"
            placeholder="Alkaa"
            required
            name="start_time"
            defaultValue={surveyHeader.start_time}
            onChange={handleHeaderChange}
          />
        </label>
        <label className="createsurveything">
          Päättyy
          <input
            type="date"
            placeholder="Päättyy"
            required
            name="end_time"
            defaultValue={surveyHeader.end_time}
            onChange={handleHeaderChange}
          />
        </label>

        <SelectProperties />

        {/* <AddQuestion /> */}
        {`Kysymyksiä (${questions.length})`}
        {questions.map((question, index) => (
          <div key={question.question_id}>
            <h4>Kysymys {index + 1}</h4>
            <AddQuestion
              setQuestions={setQuestions}
              questions={questions as Question[]}
              question={question}
            />
          </div>
        ))}
        <p className="createsurveybuttons">
          <button type="button" onClick={addQuestion} className="hehe">
            Lisää kysymys
          </button>

          <SurveyPreview
            survey={{
              survey_header: surveyHeader as SurveyHeader,
              questions: questions as Question[],
            }}
          />
        </p>
        <ButtonLoading text="Luo kysely" />
      </form>
    </div>
  );
};

export default CreateSurvey;
