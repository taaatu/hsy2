interface ResidentResults {
  average_percentage: number;
  average_survey_point: number;
  own_percentage: number;
  own_survey_points: number;
  answer_count: number;
}

interface AssignedSurveyResults {
  average_percentage: number;
  average_survey_point: number;
  number_of_answers: number;
  survey_questions_statistics: QuestionStatistics[];
}

type BaseSurveyResults = {
  average_percentage: number;
  average_survey_point: number;
  number_of_answers: number;
  survey_questions_statistics: QuestionStatistics[];
};

type QuestionStatistics = {
  number_resident_selected_option_1: number;
  number_resident_selected_option_2: number;
  number_resident_selected_option_3: number;
};

export type {
  ResidentResults,
  AssignedSurveyResults,
  QuestionStatistics,
  BaseSurveyResults,
};
