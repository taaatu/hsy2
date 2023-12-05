import { useEffect, useState } from 'react';
import useSurvey from '../../../hooks/SurveyHook';
import { useParams } from 'react-router-dom';
import styles from '../resident.module.css';
import { FaPersonHiking } from 'react-icons/fa6';
import { BsFillBuildingFill } from 'react-icons/bs';
import { ResidentResults } from '../../../interfaces/SurveyResults';
import { ResultsMessage } from './ResultsMessage';
import { getPropertyColor } from '../../../utils/Functions';
import { BuildingColor } from '../../../interfaces/Building';

const UserResultsPage = () => {
  const { getResidentAnwers } = useSurvey();
  const { key } = useParams();
  const [results, setResults] = useState<ResidentResults>();

  useEffect(() => {
    if (!key) return;
    (async () => {
      const _results = await getResidentAnwers(key);
      _results && setResults(_results);
    })();
  }, []);

  if (!results) return <h1>Ei tuloksia koodilla</h1>;

  return (
    <main>
      <div
        className="color3 rounded"
        style={{ maxWidth: '550px', margin: 'auto' }}
      >
        <ResultsMessage pointsPercentage={results.own_percentage} />

        <h4 style={{ fontWeight: 'bolder', textAlign: 'center' }}>
          Millaisessa taloyhtiössä asut?
        </h4>

        <p className="padding1">
          {buildingColorMessage(results.average_percentage)}
        </p>
        <div style={{ margin: 'auto', width: 'fit-content' }}>
          <BsFillBuildingFill
            size={50}
            color={getPropertyColor(results.average_percentage)}
          />
        </div>

        <div className="padding1" style={{ textAlign: 'center' }}>
          Taloyhtiöstänne {results.answer_count} on vastannut kyselyyn
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
              style={{
                marginLeft: `${results.own_percentage}%`,
                position: 'absolute',
                transform: `translate(-${results.own_percentage}%)`,
              }}
            />
            <BsFillBuildingFill
              size="2rem"
              style={{
                marginLeft: `${results.average_percentage}%`,
                position: 'absolute',
                transform: `translate(-${results.average_percentage}%)`,
              }}
            />
          </div>

          <div className={styles.axis}></div>
          <div
            className="flex-row"
            style={{ gap: 0, justifyContent: 'space-between' }}
          >
            <BsFillBuildingFill size={40} color={BuildingColor.RED} />
            <BsFillBuildingFill size={40} color={BuildingColor.BLUE} />
            <BsFillBuildingFill size={40} color={BuildingColor.GREEN} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserResultsPage;

const buildingColorMessage = (percentage: number) => {
  if (percentage < 33) {
    return redMsg;
  } else if (percentage >= 33 && percentage < 66) {
    return yellowMsg;
  } else if (percentage >= 66) {
    return greenMsg;
  }
};

const redMsg = `Taloyhtiönne tahtotila on matala. Tarvitsette suunnitelman jolla nostattaa tahtotilaa, jotta yhteisten päätösten tekeminen olisi helpompaa. Seuraava yhtiökokous on oiva tilaisuus selvittää seuraavat askeleet kohti tahtotilan kohotusta.`;

const yellowMsg = `Taloyhtiönne tahtotila on keskiverto tasolla. Taloyhtiössänne löytyy monipuolisesti ajattelevia osakkaita. Osalle taloyhtiön viihtyisyys on tärkeämpi ja joillekin yleiskunto. Tahtotila kaipaisi kohennusta, josta on mahdollista keskustella seuraavassa yhtiökokouksessa.`;

const greenMsg = `Taloyhtiönne tahtotila on korkea. Omaatte taloyhtiönä kollektiivisen näkemyksen. Olette suuntaamassa ja itse asiassa olettekin jo tehneet kovasti töitä tahtotilan eteen. Sen ylläpitämiseksi täytyy tehdä töitä ja seuraava yhtiökokous on oiva mahdollisuus suunnitella tulevaa.`;
