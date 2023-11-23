import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  Label,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
  Tooltip,
} from 'recharts';
import {
  AssignedSurveyResults,
  BaseSurveyResults,
} from '../../interfaces/SurveyResults';
import { getQuestionPoints } from '../../utils/Functions';

type Props = {
  results: AssignedSurveyResults | BaseSurveyResults;
};

export const SurveyBarChart = ({ results }: Props) => {
  return (
    <div
      className="padding1"
      style={{ flex: 1, backgroundColor: 'lightgray', minWidth: 300 }}
    >
      <h5>Kysymyskohtainen vastausjakauma</h5>
      <ResponsiveContainer width={'100%'} height={400}>
        <ComposedChart
          width={300}
          height={500}
          data={getQuestionPoints(results.survey_questions_statistics)}
        >
          <XAxis>
            <Label
              value="Kysymysten numerot"
              offset={0}
              position="insideBottom"
            />
          </XAxis>
          <YAxis
            label={{
              value: 'Pisteiden määrä',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />

          <Bar dataKey="points" name="Pistemäärä" barSize={20} fill="#413ea0" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
