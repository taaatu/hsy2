import { useContext, useEffect, useState } from 'react';
import { AssignedSurvey } from '../../interfaces/Survey';
import { LoadingList } from './LoadingList';
import useSurvey from '../../hooks/SurveyHook';
import useNav from '../../hooks/NavHook';
import { MainContext } from '../../context/MainContext';

type Props = {
  surveyid: number;
};

export const AssignedSurveyList = ({ surveyid }: Props) => {
  const [assignedSurveys, setAssignedSurveys] = useState<AssignedSurvey[]>([]);
  const { getAssignedSurveys } = useSurvey();
  const { navigateAssignedSurvey } = useNav();
  const { update } = useContext(MainContext);

  useEffect(() => {
    (async () => {
      const _assignedSurveys = await getAssignedSurveys();
      const _filtered = _assignedSurveys.filter(
        (s) => s.survey_id === Number(surveyid)
      );
      setAssignedSurveys(_filtered);
    })();
  }, [update, surveyid]);

  return (
    <>
      <LoadingList>
        {assignedSurveys.map((survey) => (
          <div key={survey.assigned_survey_id} className="list-item">
            <h4 style={{ flex: 1 }}>{survey.survey_title}</h4>
            <div style={{ flex: 1 }}>
              {survey.street}, {survey.post_code}, {survey.city}
            </div>
            <button
              onClick={() =>
                navigateAssignedSurvey(surveyid, survey.assigned_survey_id)
              }
            >
              Siirry
            </button>
          </div>
        ))}
      </LoadingList>
    </>
  );
};
