import { useNavigate } from 'react-router-dom';
import { MessageResponse } from '../interfaces/Response';
import { Survey, SurveyHeader } from '../interfaces/Survey';
import { format } from 'date-fns';
import useFetch from './DoFetch';

const useSurvey = () => {
  const navigate = useNavigate();
  const { doFetch } = useFetch();

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

  const deleteSurvey = async (id: string) => {
    try {
      const response = await doFetch(`survey/surveybyid/${id}`, 'DELETE');
      console.log('Delete survey: ', response);
      alert('Kysely poistettu');
      navigate('/admin/surveys');
    } catch (error: any) {
      alert('Kyselyn poistaminen epäonnistui');
      throw new Error(error.message);
    }
  };

  return { getSurveys, getSurveyById, createSurvey, deleteSurvey };
};

export default useSurvey;
