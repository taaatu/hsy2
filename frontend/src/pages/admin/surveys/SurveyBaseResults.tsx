import { useEffect, useState } from 'react';
import useSurvey from '../../../hooks/SurveyHook';
import { BaseSurveyResults } from '../../../interfaces/SurveyResults';
import { SurveyPieChart } from '../../../components/charts/SurveyPieChart';
import { BsFillBuildingFill } from 'react-icons/bs';
import { getPropertyColor } from '../../../utils/Functions';
import styles from './Surveys.module.css';
import { SurveyBarChart } from '../../../components/charts/SurveyBarChart';

type Props = {
  surveyid: number;
};

export const SurveyBaseResults = ({ surveyid }: Props) => {
  const [results, setResults] = useState<BaseSurveyResults>();
  const { getSurveyBaseResults } = useSurvey();

  useEffect(() => {
    (async () => {
      setResults(await getSurveyBaseResults(surveyid));
    })();
  }, [surveyid]);

  if (!results) return <h2 style={{ marginTop: '1rem' }}>Ei vastauksia</h2>;

  return (
    <div className="padding1 column">
      <div className={styles.data}>
        <div>
          <h5>Vastaajien määrä </h5>
          <h4>{results.number_of_answers}</h4>
        </div>
        <div>
          <h5>Keskiarvo pisteet</h5>
          <h4>{results.average_survey_point}</h4>
        </div>
        <div>
          <h5>Yleinen tahtotila</h5>
          <h4>{results.average_percentage} %</h4>
          {results.average_percentage && (
            <BsFillBuildingFill
              size={50}
              color={getPropertyColor(results.average_percentage)}
            />
          )}
        </div>
      </div>

      <div className="flex-row">
        <SurveyPieChart results={results} />
        <SurveyBarChart results={results} />
      </div>
    </div>
  );
};
