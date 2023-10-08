import { MessageResponse } from '../interfaces/Response';
import { Survey, SurveyHeader } from '../interfaces/Survey';
import { doFetch } from './DoFetch';

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

  const createSurvey = async (survey: Survey) => {
    try {
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

  return { getSurveys, createSurvey };
};

export default useSurvey;
