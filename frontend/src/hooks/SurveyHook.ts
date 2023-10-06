import { Survey } from '../interfaces/Survey';
import { doFetch } from './DoFetch';

const useSurvey = () => {
  const createSurvey = async (survey: Survey) => {
    try {
      const response = await doFetch('survey', 'POST', survey);
      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  return { createSurvey };
};

export default useSurvey;
