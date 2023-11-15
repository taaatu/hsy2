import { useEffect, useState } from 'react';
import AddQuestion from './AddQuestion.js';
import {
  ANSWER_1,
  ANSWER_2,
  ANSWER_3,
} from '../../../../variables/Constants.js';
import { useParams } from 'react-router-dom';
import { Survey, SurveyStatus } from '../../../../interfaces/Survey.js';
import { Question } from '../../../../interfaces/Question.js';
import useSurvey from '../../../../hooks/SurveyHook.js';
import { SurveyPreview } from '../../../../components/SurveyPreview.js';
import { ButtonLoading } from '../../../../components/ButtonLoading.js';
import styles from './CreateSurvey.module.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { SuccessAlertModal } from '../../../../components/SuccessAlertModal.js';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { FormFieldError } from '../../../../components/FormFieldError.js';
import { FormErrorList } from './FormErrorList.js';

const defaultQuestion: Question = {
  question: '',
  option_1: ANSWER_1,
  option_2: ANSWER_2,
  option_3: ANSWER_3,
};

const CreateSurveyPage = () => {
  const { surveyid } = useParams();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [succesMessage, setSuccesMessage] = useState('');

  const { createSurvey, getSurveyById } = useSurvey();
  const {
    register,
    control,
    handleSubmit,
    reset,
    getValues,
    setError,
    formState: { errors },
  } = useForm<Survey>({
    defaultValues: {
      survey_header: {
        survey_status: SurveyStatus.UNPUBLISHED,
        start_time: new Date().toISOString().slice(0, 10),
      },
      questions: [defaultQuestion],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = async (data: Survey) => {
    data.survey_header.survey_status =
      data.survey_header.survey_status === true
        ? SurveyStatus.PUBLISHED
        : SurveyStatus.UNPUBLISHED;
    console.log('data: ', data);
    const res = await createSurvey(data);
    if (!res) return;
    setSuccesMessage(res);
    setShowSuccessModal(true);
  };

  useEffect(() => {
    console.log('surveyid: ', surveyid);
    if (!surveyid) return;
    (async () => {
      const _survey = await getSurveyById(surveyid);
      if (!_survey) return;
      reset(_survey);
    })();
  }, []);

  return (
    <main className={styles.container}>
      <SuccessAlertModal
        show={showSuccessModal}
        message={succesMessage}
        navRoute="/admin/surveys"
      />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Tabs className={styles.tabsBar}>
          <Tab eventKey="survey" title="Kysely">
            <div className="column" style={{ maxWidth: '60ch', gap: '1rem' }}>
              <label className="createsurveything">
                Kyselyn nimi
                <input
                  maxLength={40}
                  className={styles.input}
                  type="text"
                  placeholder="Kyselyn nimi"
                  {...register('survey_header.survey_title', {
                    required: {
                      value: true,
                      message: 'Kyselyn nimi vaaditaan',
                    },
                  })}
                />
                <FormFieldError error={errors.survey_header?.survey_title} />
              </label>
              <div className={styles.dates}>
                <label className="createsurveything">
                  Alkaa
                  <input
                    type="date"
                    placeholder="Alkaa"
                    className={styles.input}
                    {...register('survey_header.start_time', {
                      required: {
                        value: true,
                        message: 'Alkamispäivä vaaditaan',
                      },
                    })}
                  />
                  <FormFieldError error={errors.survey_header?.start_time} />
                </label>
                <label className="createsurveything">
                  Päättyy
                  <input
                    type="date"
                    placeholder="Päättyy"
                    className={styles.input}
                    {...register('survey_header.end_time', {
                      required: {
                        value: true,
                        message: 'Päättymispäivä vaaditaan',
                      },
                    })}
                  />
                  <FormFieldError error={errors.survey_header?.end_time} />
                </label>
              </div>

              <label className="createsurveything">
                Kuvaus
                <textarea
                  placeholder="Kuvaus"
                  {...register('survey_header.description', {
                    required: {
                      value: true,
                      message: 'Kuvaus vaaditaan',
                    },
                  })}
                />
                <FormFieldError error={errors.survey_header?.description} />
              </label>
            </div>
          </Tab>
          <Tab eventKey="questions" title="Kysymykset" id="column">
            <div className="column">
              <h3>{`Kysymyksiä (${fields.length})`}</h3>
              <div className="column" style={{ gap: '1rem' }}>
                {fields.map((field, index) => (
                  <>
                    <AddQuestion
                      key={field.id}
                      index={index}
                      register={register}
                      control={control}
                      remove={remove}
                    />
                  </>
                ))}
              </div>

              <button
                type="button"
                className="colored"
                onClick={() => append(defaultQuestion)}
              >
                Lisää kysymys
              </button>
            </div>
          </Tab>

          <Tab eventKey="create" title="Luo kysely">
            <div className="column color3 padding1">
              <label className="flex-row center-align">
                <Controller
                  name="survey_header.survey_status"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <input
                      style={{ height: '1rem', width: '1rem' }}
                      type="checkbox"
                      {...field}
                    />
                  )}
                />
                Jaa kysely isännöitsijöille
              </label>

              <SurveyPreview survey={getValues()} />
              <ButtonLoading text="Luo kysely" />
              <FormErrorList
                errors={errors}
                questions={getValues().questions}
              />
            </div>
          </Tab>
        </Tabs>
      </form>
    </main>
  );
};

export default CreateSurveyPage;
