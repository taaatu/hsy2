import { useEffect, useState } from 'react';
import { Survey } from '../../../interfaces/Survey';
import AnswerQuestion from '../../../components/forms/AnswerQuestion';
import PropTypes from 'prop-types';
import { Answer } from '../../../interfaces/Answer';
import { AnswerSurveyForm } from '../../../components/forms/AnswerSurveyForm';

type Props = {
  survey: Partial<Survey>;
  isPreview?: boolean;
};

export const SurveyAnswerPage = ({ survey, isPreview = false }: Props) => {
  return (
    <div>
      <AnswerSurveyForm survey={survey} isPreview={isPreview} />
    </div>
  );
};

SurveyAnswerPage.propTypes = {
  survey: PropTypes.object.isRequired,
};
