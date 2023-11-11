import { useParams } from 'react-router-dom';
import useSurvey from '../../../hooks/SurveyHook';
import { useEffect, useState } from 'react';
import { AssignedSurvey } from '../../../interfaces/Survey';
import { ButtonLoading } from '../../../components/ButtonLoading';
import {
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  ComposedChart,
  Area,
  Bar,
  Line,
} from 'recharts';
import Tabs from 'react-bootstrap/esm/Tabs';
import { Tab } from 'react-bootstrap';

const ManagerSingleSurveyPage = () => {
  const { id } = useParams();
  const [survey, setSurvey] = useState<AssignedSurvey>();
  const [surveyKeys, setSurveyKeys] = useState<string[]>([]);
  const { createSurveyKeys, getAssignedSurveys, getSurveyKeys } = useSurvey();

  const handleCreateKey = async () => {
    if (!survey) return;
    await createSurveyKeys(survey.assigned_survey_id);
    setSurveyKeys(await getSurveyKeys(survey.assigned_survey_id));
  };

  useEffect(() => {
    (async () => {
      const _surveys = await getAssignedSurveys();
      const _survey = _surveys?.find(
        (survey) => survey.assigned_survey_id === Number(id)
      );
      if (!_survey) return;
      setSurvey(_survey);
      setSurveyKeys(await getSurveyKeys(_survey?.assigned_survey_id));
    })();
  }, []);

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

  return (
    <main>
      <h4>{survey?.survey_title}</h4>
      <Tabs>
        <Tab eventKey="vastaukset" title="Vastaukset">
          <div style={{ backgroundColor: 'white' }}>
            <PieChart width={730} height={500}>
              <Legend verticalAlign="top" height={36} />
              <Pie
                data={data01}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {data01.map((entry, index) => (
                  <Cell key={`pie-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <ComposedChart width={730} height={250} data={data01}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid stroke="#f5f5f5" />
              <Area
                type="monotone"
                dataKey="amt"
                fill="#8884d8"
                stroke="#8884d8"
              />
              <Bar dataKey="pv" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="uv" stroke="#ff7300" />
            </ComposedChart>
          </div>
        </Tab>
        <Tab eventKey="kysely" title="Jaa kysely">
          <ButtonLoading text="Luo koodi" onClick={handleCreateKey} />
          <ul style={{ backgroundColor: 'white' }}>
            <h4>Käyttämättömät koodit {`(${surveyKeys.length})`}</h4>
            {surveyKeys.map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        </Tab>
      </Tabs>
    </main>
  );
};

export default ManagerSingleSurveyPage;
