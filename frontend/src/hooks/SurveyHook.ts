import { SelectLevel } from './../pages/admin/createsurvey/SelectProperties';
import { useNavigate } from 'react-router-dom';
import { MessageResponse } from '../interfaces/Response';
import { AssignedSurvey, Survey, SurveyHeader } from '../interfaces/Survey';
import { format } from 'date-fns';
import useFetch from './DoFetch';
import { Building } from '../interfaces/Building';

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

  const createSurvey = async (survey: Survey, buildings: Building[]) => {
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

      const response = await doFetch('survey', 'POST', survey);
      console.log('Create survey: ', response);
      if (!response.survey_id) return;
      if (buildings.length === 0) return alert('Kysely luotu');
      await Promise.all(
        buildings.map(async (building) => {
          await doFetch(`survey/assignsurevey`, 'POST', {
            b_id: building.building_id,
            s_id: response.survey_id,
          });
        })
      );
      alert('Kysely luotu ja taloyhtiöt lisätty');
    } catch (error: any) {
      alert('Kyselyn luominen epäonnistui');
      throw new Error(error.message);
    }
  };

  const getAssignedSurveys = async () => {
    try {
      const response = await doFetch('survey/assignsurevey', 'GET');
      console.log('Assigned surveys: ', response);
      return response as AssignedSurvey[];
    } catch (error: any) {
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

  return {
    getSurveys,
    getSurveyById,
    createSurvey,
    getAssignedSurveys,
    deleteSurvey,
  };
};

export default useSurvey;
