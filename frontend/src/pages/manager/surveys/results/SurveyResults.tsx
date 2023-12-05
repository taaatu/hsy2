import { BsFillBuildingFill } from 'react-icons/bs';
import { getPropertyColor } from '../../../../utils/Functions';
import { useEffect, useState } from 'react';
import { AssignedSurveyResults } from '../../../../interfaces/SurveyResults';
import useSurvey from '../../../../hooks/SurveyHook';
import styles from './Results.module.css';
import { SurveyPieChart } from '../../../../components/charts/SurveyPieChart';
import { QuestionsByPoints } from '../../../../components/charts/QuestionsByPoints';

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
    <div className="padding1 column">
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
        <SurveyPieChart results={surveyResults} />
        {/* <SurveyBarChart results={surveyResults} /> */}
        <QuestionsByPoints results={surveyResults} />
      </div>
    </div>
  );
};

// const pieData = (data: QuestionStatistics[], answersCount: number) => [
//   {
//     name: 'Pidän tärkeänä tai toimin näin',
//     value: getSelectedOptionsCount(data, 1),
//     p: (getSelectedOptionsCount(data, 1) / (data.length * answersCount)) * 100,
//     color: BuildingColor.GREEN,
//   },
//   {
//     name: 'Asialla ei ole merkitystä tai asia ei koske minua',
//     value: getSelectedOptionsCount(data, 2),
//     p: (getSelectedOptionsCount(data, 1) / (data.length * answersCount)) * 100,
//     color: BuildingColor.YELLOW,
//   },
//   {
//     name: 'En pidä tärkeänä tai en toimi näin',
//     value: getSelectedOptionsCount(data, 3),
//     p: (getSelectedOptionsCount(data, 1) / (data.length * answersCount)) * 100,
//     color: BuildingColor.RED,
//   },
// ];

// const data01 = [
//   {
//     name: 'Pidän tärkeänä tai toiminin näin',
//     value: 600,
//     color: BuildingColor.GREEN,
//   },
//   {
//     name: 'Asialla ei ole merkitystä tai asia ei koske minua',
//     value: 300,
//     color: BuildingColor.YELLOW,
//   },
//   {
//     name: 'En pidä tärkeänä tai en toimi näin',
//     value: 300,
//     color: BuildingColor.RED,
//   },
// ];

// const data02 = [
//   {
//     name: 'Kysymys 1',
//     value: 10,
//   },
//   {
//     name: 'Kysymys 2',
//     value: 15,
//   },
//   {
//     name: 'Kysymys 3',
//     value: 13,
//   },
//   {
//     name: 'Kysymys 4',
//     value: 11,
//   },
//   {
//     name: 'Kysymys 5',
//     value: 5,
//   },
//   {
//     name: 'Kysymys 1',
//     value: 10,
//   },
//   {
//     name: 'Kysymys 2',
//     value: 15,
//   },
//   {
//     name: 'Kysymys 3',
//     value: 13,
//   },
//   {
//     name: 'Kysymys 4',
//     value: 11,
//   },
//   {
//     name: 'Kysymys 5',
//     value: 5,
//   },
//   {
//     name: 'Kysymys 1',
//     value: 10,
//   },
//   {
//     name: 'Kysymys 2',
//     value: 15,
//   },
//   {
//     name: 'Kysymys 3',
//     value: 13,
//   },
//   {
//     name: 'Kysymys 4',
//     value: 11,
//   },
//   {
//     name: 'Kysymys 5',
//     value: 5,
//   },
//   {
//     name: 'Kysymys 1',
//     value: 10,
//   },
//   {
//     name: 'Kysymys 2',
//     value: 15,
//   },
//   {
//     name: 'Kysymys 3',
//     value: 13,
//   },
//   {
//     name: 'Kysymys 4',
//     value: 11,
//   },
//   {
//     name: 'Kysymys 5',
//     value: 5,
//   },
// ];
