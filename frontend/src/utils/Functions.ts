import { BuildingColor } from '../interfaces/Building';
import { QuestionStatistics } from '../interfaces/SurveyResults';

export const getPropertyColor = (pointPercentage: number) => {
  if (pointPercentage < 33) return BuildingColor.RED;
  if (pointPercentage < 66) return BuildingColor.BLUE;
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
  return data.map((question) => {
    const points =
      question.number_resident_selected_option_1 * 1 +
      question.number_resident_selected_option_2 * 0.5;
    return { question: question.question, points: points };
  });
};

export const getTopQuestionsByPoints = (data: QuestionStatistics[]) => {
  const points = getQuestionPoints(data);
  const sortedPoints = points.sort((a, b) => b.points - a.points);
  return {
    top: sortedPoints.slice(0, 3),
    bottom: sortedPoints.reverse().slice(0, 3),
  };
};
