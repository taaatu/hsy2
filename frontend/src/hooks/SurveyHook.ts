import { MessageResponse } from '../interfaces/Response';
import { Survey, SurveyHeader } from '../interfaces/Survey';
import { doFetch } from './DoFetch';
import { format } from 'date-fns';

const useSurvey = () => {
  const getSurveys = async () => {
    try {
      const response = await doFetch('survey', 'GET');
      console.log('Surveys: ', response);
      return response as SurveyHeader[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const getSurveyById = async (id: string) => {
    try {
      const response = await doFetch(`survey/surveybyid/${id}`, 'GET');
      console.log('Survey by id: ', response);
      return response as Survey;
    } catch (error: any) {
      console.error('Get survey by id', error.message);
    }
  };

  const createSurvey = async (survey: Survey) => {
    try {
      // Format dates
      survey.survey_header.start_time = format(
        new Date(survey.survey_header.start_time),
        'dd-MM-yyyy'
      );
      survey.survey_header.end_time = format(
        new Date(survey.survey_header.end_time),
        'dd-MM-yyyy'
      );

      const response = (await doFetch(
        'survey',
        'POST',
        survey
      )) as MessageResponse;
      console.log('Create survey: ', response);
      alert('Kysely luotu');
    } catch (error: any) {
      alert('Kyselyn luominen epäonnistui');
      throw new Error(error.message);
    }
  };

  return { getSurveys, getSurveyById, createSurvey };
};

export default useSurvey;
