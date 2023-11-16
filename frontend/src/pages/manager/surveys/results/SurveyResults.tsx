import { BsFillBuildingFill } from 'react-icons/bs';
import {
  PieChart,
  Legend,
  Pie,
  Cell,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  Bar,
  Line,
} from 'recharts';
import {
  getPropertyColor,
  getSelectedOptionsCount,
} from '../../../../utils/Functions';
import { useEffect, useState } from 'react';
import {
  AssignedSurveyResults,
  QuestionStatistics,
} from '../../../../interfaces/SurveyResults';
import useSurvey from '../../../../hooks/SurveyHook';
import styles from './Results.module.css';

type Props = {
  surveyId: number;
};

export const SurveyResults = ({ surveyId }: Props) => {
  const [surveyResults, setSurveyResults] = useState<AssignedSurveyResults>();
  const { getAssignedSurveyResults } = useSurvey();

  useEffect(() => {
    (async () => {
      const _results = await getAssignedSurveyResults(surveyId);
      setSurveyResults(_results);
    })();
  }, [surveyId]);

  if (!surveyResults || surveyResults.number_of_answers === 0)
    return <h2 style={{ marginTop: '1rem' }}>Ei vastauksia</h2>;

  return (
    <div className="padding1">
      <div className={styles.data}>
        <div>
          <h5>Vastaajien määrä </h5>
          <h4>{surveyResults?.number_of_answers}</h4>
        </div>
        <div>
          <h5>Keskiarvo pisteet</h5>
          <h4>{surveyResults?.average_survey_point}</h4>
        </div>
        <div>
          <h5>Taloyhtiön tahtotila </h5>
          <h4>{surveyResults?.average_percentage} %</h4>
          {surveyResults?.average_percentage && (
            <BsFillBuildingFill
              size={50}
              color={getPropertyColor(surveyResults?.average_percentage)}
            />
          )}
        </div>
      </div>

      <div className="flex-row">
        <PieChart width={300} height={500}>
          <Legend verticalAlign="top" height={30} />
          <Pie
            data={pieData(surveyResults.survey_questions_statistics)}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {pieData(surveyResults.survey_questions_statistics).map(
              (entry, index) => (
                <Cell key={`pie-${index}`} fill={entry.color} />
              )
            )}
          </Pie>
        </PieChart>
        <ComposedChart width={400} height={300} data={data01}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="pv" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="uv" stroke="#ff7300" />
        </ComposedChart>
      </div>
    </div>
  );
};

const pieData = (data: QuestionStatistics[]) => [
  {
    name: 'Pidän tärkeänä tai toimin näin',
    value: getSelectedOptionsCount(data, 1),
    color: 'red',
  },
  {
    name: 'Asialla ei ole merkitystä tai asia ei koske minua',
    value: getSelectedOptionsCount(data, 2),
    color: 'blue',
  },
  {
    name: 'En pidä tärkeänä tai en toimi näin',
    value: getSelectedOptionsCount(data, 3),
    color: 'green',
  },
];

const data01 = [
  {
    name: 'Pidän tärkeänä tai toiminin näin',
    value: 600,
    color: 'red',
  },
  {
    name: 'Asialla ei ole merkitystä tai asia ei koske minua',
    value: 300,
    color: 'blue',
  },
  {
    name: 'En pidä tärkeänä tai en toimi näin',
    value: 300,
    color: 'green',
  },
];
