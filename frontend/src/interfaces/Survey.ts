import { Question } from './Question';

type SurveyHeader = {
  survey_id?: number;
  u_id: number;
  survey_title: string;
  description: string;
  start_time: string;
  end_time: string;
};

interface Survey {
  survey_header: SurveyHeader;
  questions: Question[];
}

export { Survey, SurveyHeader };
