import { Question } from './Question';

type SurveyHeader = {
  survey_id?: number;
  u_id: number;
  survey_title: string;
  description: string;
  start_time: string;
  end_time: string;
  survey_status?: SurveyStatus | boolean;
};

enum SurveyStatus {
  PUBLISHED = 'published',
  UNPUBLISHED = 'unpublished',
}

interface Survey {
  survey_header: SurveyHeader;
  questions: Question[];
}

type AssignedSurvey = {
  assigned_survey_id: number;
  b_id: number;
  survey_id: number;
  survey_creator_id: number;
  survey_title: string;
  start_time: string;
  end_time: string;
  description: string;
  assigned_perperty_manager_u_id: number;
  street: string;
  post_code: string;
  city: string;
  building_name: number;
};

export { Survey, SurveyHeader, AssignedSurvey, SurveyStatus };
