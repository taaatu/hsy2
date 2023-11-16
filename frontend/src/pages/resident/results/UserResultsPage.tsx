import { useEffect, useState } from 'react';
import useSurvey from '../../../hooks/SurveyHook';
import { useParams } from 'react-router-dom';
import { XAxis } from 'recharts';
import styles from '../resident.module.css';
import { FaPersonHiking } from 'react-icons/fa6';
import { BsFillBuildingFill } from 'react-icons/bs';
import { ResidentResults } from '../../../interfaces/SurveyResults';
import { ResultsMessage } from './ResultsMessage';
import { getPropertyColor } from '../../../utils/Functions';

const UserResultsPage = () => {
  const { getResidentAnwers } = useSurvey();
  const { key } = useParams();
  const [results, setResults] = useState<ResidentResults>();
  const test = 100;
  const test2 = 10;

  useEffect(() => {
    if (!key) return;
    (async () => {
      const _results = await getResidentAnwers(key);
      _results && setResults(_results);
    })();
  }, []);

  return (
    <main>
      <div
        className="color3 rounded"
        style={{ maxWidth: '550px', margin: 'auto' }}
      >
        <ResultsMessage pointsPercentage={results?.own_percentage || 0} />

        <h4 style={{ fontWeight: 'bolder', textAlign: 'center' }}>
          Millaisessa taloyhtiössä asut?
        </h4>

        <p style={{ textAlign: 'center' }}>Jotain tekstiä prosentin mukaan</p>
        <div
          style={{
            height: '10px',
            width: '10px',
            backgroundColor: getPropertyColor(results?.average_percentage || 2),
          }}
        ></div>
        <div className="padding1" style={{ textAlign: 'center' }}>
          Taloyhtiöstänne {results?.answer_count} on vastannut kyselyyn
        </div>

        <div className={`${styles.lineBox} padding1`}>
          <div
            style={{
              position: 'relative',
              height: '2rem',
            }}
          >
            <FaPersonHiking
              size="2rem"
              color="purple"
              style={{
                marginLeft: `${results?.own_percentage}%`,
                position: 'absolute',
                transform: `translate(-${results?.own_percentage}%)`,
              }}
            />
            <BsFillBuildingFill
              size="2rem"
              style={{
                marginLeft: `${results?.average_percentage}%`,
                position: 'absolute',
                transform: `translate(-${results?.average_percentage}%)`,
              }}
            />
          </div>

          <div className={styles.axis}></div>
          <div
            className="flex-row"
            style={{ gap: 0, justifyContent: 'space-between' }}
          >
            <BsFillBuildingFill size={40} color="red" />
            <BsFillBuildingFill size={40} color="yellow" />
            <BsFillBuildingFill size={40} color="green" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserResultsPage;
