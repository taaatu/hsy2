import { BuildingColor } from '../interfaces/Building';
import { QuestionStatistics } from '../interfaces/SurveyResults';

export const getPropertyColor = (pointPercentage: number) => {
  console.log('pointPercentage: ', pointPercentage);
  if (pointPercentage < 33) return BuildingColor.RED;
  if (pointPercentage < 66) return BuildingColor.YELLOW;
  return BuildingColor.GREEN;
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

export const getQuestionPoints = (data: QuestionStatistics[]) => {
  const points = data.map((question, i) => {
    const _p =
      question.number_resident_selected_option_1 * 1 +
      question.number_resident_selected_option_2 * 0.5;
    return { name: 'Kysymys' + i, points: _p };
  });
  return points;
};
