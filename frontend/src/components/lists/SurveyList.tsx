import { useNavigate } from 'react-router-dom';
import { SurveyHeader, SurveyStatus } from '../../interfaces/Survey';
import { LoadingList } from './LoadingList';
import styles from './Lists.module.css';
import { useContext, useEffect, useState } from 'react';
import useSurvey from '../../hooks/SurveyHook';
import { SearchBar } from '../SearchBar';
import { MainContext } from '../../context/MainContext';
import { UserGroup } from '../../interfaces/User';

export const SurveyList = () => {
  const { curentUser } = useContext(MainContext);
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState<SurveyHeader[]>([]);
  const [search, setSearch] = useState('');

  const filteredSurveys = surveys.filter((survey) => {
    return survey.survey_title.toLowerCase().includes(search.toLowerCase());
  });

  const navEndpoint =
    curentUser?.user_group === UserGroup.ADMIN ? 'admin' : 'manager';

  const { getSurveys } = useSurvey();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  useEffect(() => {
    (async () => {
      const _surveys = await getSurveys();
      if (!_surveys) return;
      setSurveys(_surveys);
    })();
  }, []);

  return (
    <div className="column">
      <h1>Kyselypohjat</h1>

      <LoadingList>
        <div className="sticky-header rounded color3">
          <div
            style={{ marginBottom: '1em', gap: '1rem', flexWrap: 'wrap' }}
            className="flex-row center-align padding1"
          >
            <SearchBar
              placeholder="Hae kyselyitä"
              handleSearch={handleSearch}
            />
            {curentUser?.user_group === UserGroup.ADMIN ? (
              <button
                onClick={() => navigate(`/admin/surveys/create`)}
                className="colored"
              >
                Luo uusi kysely
              </button>
            ) : null}
          </div>
          <div className={`bold padding1 ${styles.buildingsHeader}`}>
            <div>Nimi</div>
            {curentUser?.user_group === UserGroup.ADMIN ? (
              <div>Jaettu</div>
            ) : null}

            <div className={styles.btnContainer}></div>
          </div>
        </div>

        {filteredSurveys.map((survey) => (
          <div key={survey.survey_id} className={styles.listItem}>
            <div style={{ flex: 1 }}>{survey.survey_title}</div>
            {curentUser?.user_group === UserGroup.ADMIN ? (
              <>
                <div style={{ flex: 1 }}>
                  {survey.survey_status === SurveyStatus.PUBLISHED
                    ? 'Kyllä'
                    : 'Ei'}
                </div>
              </>
            ) : null}
            <div className={styles.btnContainer}>
              <button
                onClick={() =>
                  navigate(`/${navEndpoint}/surveys/${survey.survey_id}`)
                }
              >
                Siirry
              </button>
            </div>
          </div>
        ))}
      </LoadingList>
    </div>
  );
};
