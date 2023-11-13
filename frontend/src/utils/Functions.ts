import { QuestionStatistics } from '../interfaces/SurveyResults';

export const getPropertyColor = (pointPercentage: number) => {
  console.log('pointPercentage: ', pointPercentage);
  if (pointPercentage < 33) return 'red';
  if (pointPercentage < 66) return 'yellow';
  return 'green';
};

export const getSelectedOptionsCount = (
  data: QuestionStatistics[],
  option: 1 | 2 | 3
) => {
  return data.reduce((acc, curr) => {
    const currentOption =
      option === 1
        ? curr.number_resident_selected_option_1
        : option === 2
        ? curr.number_resident_selected_option_2
        : curr.number_resident_selected_option_3;
    return acc + currentOption;
  }, 0);
};
