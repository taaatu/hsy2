import { useNavigate } from 'react-router-dom';
import { AssignedSurvey, Survey, SurveyHeader } from '../interfaces/Survey';
import { format } from 'date-fns';
import useFetch from './DoFetch';
import { Building } from '../interfaces/Building';
import { Answer } from '../interfaces/Answer';
import { useContext } from 'react';
import { MainContext } from '../context/MainContext';
import {
  AssignedSurveyResults,
  ResidentResults,
} from '../interfaces/SurveyResults';

const useSurvey = () => {
  const navigate = useNavigate();
  const { doFetch } = useFetch();
  const { curentUser } = useContext(MainContext);

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
      survey.survey_header.u_id = curentUser?.user_id as number;
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
      return 'Kysely luotu';
    } catch (error: any) {
      alert('Kyselyn luominen epäonnistui');
      throw new Error(error.message);
    }
  };

  const assignSurveyToBuildings = async (
    buildings: Building[],
    surveyid: number
  ) => {
    try {
      await Promise.all(
        buildings.map(async (building) => {
          await doFetch(`survey/assignsurevey`, 'POST', {
            b_id: building.building_id,
            s_id: surveyid,
          });
        })
      );
    } catch (error: any) {
      console.error('Assign survey to buildings', error.message);
      alert('Kyselyn lisääminen taloyhtiöihin epäonnistui');
    }
  };

  const createSurveyKeys = async (surveyId: number, count: number) => {
    try {
      await Promise.all(
        Array.from(Array(count).keys()).map(async () => {
          await doFetch('survey/assignsureveykeypost', 'POST', {
            as_id: surveyId,
          });
        })
      );
    } catch (error: any) {
      alert('Koodin luominen epäonnistui: ' + error.message);
      throw new Error(error.message);
    }
  };

  const getSurveyKeys = async (surveyId: number) => {
    try {
      const response = await doFetch(
        `survey/assignsureveykey/${surveyId}/unused`,
        'GET'
      );
      console.log('Get survey keys: ', response);
      if (!response) return [];
      // Map response to array of keys
      const keys = response.map((obj: any) => obj.survey_key) as string[];
      return keys as string[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const getSurveyByKey = async (key: string) => {
    try {
      const response = await doFetch(`submit/${key}`, 'GET');
      console.log('Survey by key: ', response);
      return response as Survey;
    } catch (error: any) {
      console.error('Get survey by key', error.message);
    }
  };

  const submitAnswers = async (answers: Answer[], surveyKey: string) => {
    try {
      const response = await doFetch(`submit/${surveyKey}`, 'POST', {
        answers: answers,
      });
      console.log('Submit answers: ', response);
      return true;
    } catch (error: any) {
      console.error('Submit answers', error.message);
      return false;
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

  const getAssignedSurveyResults = async (id: number) => {
    try {
      const response = await doFetch(`survey/surveyanswerlist/${id}`, 'GET');
      console.log('Assigned survey results: ', response);
      return response as AssignedSurveyResults;
    } catch (error: any) {
      console.error('Get assigned survey results: ', error.message);
    }
  };

  const getResidentAnwers = async (key: string) => {
    try {
      const response = await doFetch(`submit/surveyanswer/${key}`, 'GET');
      console.log('Resident answers: ', response);
      return response as ResidentResults;
    } catch (error: any) {
      console.error('Get resident answers', error.message);
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
    createSurveyKeys,
    getAssignedSurveys,
    getSurveyByKey,
    submitAnswers,
    getSurveyKeys,
    getResidentAnwers,
    assignSurveyToBuildings,
    getAssignedSurveyResults,
    deleteSurvey,
  };
};

export default useSurvey;
