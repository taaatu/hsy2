import {
  AssignedSurveyResults,
  BaseSurveyResults,
  QuestionStatistics,
} from '../../interfaces/SurveyResults';
import { BuildingColor } from '../../interfaces/Building';
import { getSelectedOptionsCount } from '../../utils/Functions';
import {
  ResponsiveContainer,
  PieChart,
  Legend,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';

type Props = {
  results: AssignedSurveyResults | BaseSurveyResults;
};

export const SurveyPieChart = ({ results }: Props) => {
  return (
    <div
      className="padding1"
      style={{ backgroundColor: 'lightgray', flex: 1, minWidth: 300 }}
    >
      <h5>Vastausjakauma</h5>
      <ResponsiveContainer width={'100%'} height={400}>
        <PieChart>
          <Legend verticalAlign="top" height={20} />
          <Tooltip />
          <Pie
            data={pieData(
              results.survey_questions_statistics,
              results.number_of_answers
            )}
            dataKey="value"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {pieData(
              results.survey_questions_statistics,
              results.number_of_answers
            ).map((entry, index) => (
              <Cell key={`pie-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const pieData = (data: QuestionStatistics[], answersCount: number) => [
  {
    name: 'Pidän tärkeänä tai toimin näin',
    value: getSelectedOptionsCount(data, 1),
    p: (getSelectedOptionsCount(data, 1) / (data.length * answersCount)) * 100,
    color: BuildingColor.GREEN,
  },
  {
    name: 'Asialla ei ole merkitystä tai asia ei koske minua',
    value: getSelectedOptionsCount(data, 2),
    p: (getSelectedOptionsCount(data, 1) / (data.length * answersCount)) * 100,
    color: BuildingColor.YELLOW,
  },
  {
    name: 'En pidä tärkeänä tai en toimi näin',
    value: getSelectedOptionsCount(data, 3),
    p: (getSelectedOptionsCount(data, 1) / (data.length * answersCount)) * 100,
    color: BuildingColor.RED,
  },
];
