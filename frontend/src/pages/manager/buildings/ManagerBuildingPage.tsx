import { useNavigate, useParams } from 'react-router-dom';
import useBuilding from '../../../hooks/BuildingHook';
import { useEffect, useState } from 'react';
import { Building } from '../../../interfaces/Building';
import { ModifyBuildingForm } from '../../../components/forms/ModifyBuildingForm';
import useSurvey from '../../../hooks/SurveyHook';
import { AssignedSurvey } from '../../../interfaces/Survey';
import { LoadingList } from '../../../components/lists/LoadingList';

const ManagerBuildingPage = () => {
  const { buildingid } = useParams();
  const { getBuildingById } = useBuilding();
  const [building, setBuilding] = useState<Building>();
  const [surveys, setSurveys] = useState<AssignedSurvey[]>([]);
  const navigate = useNavigate();
  const { getAssignedSurveys } = useSurvey();

  useEffect(() => {
    if (!buildingid) return;
    (async () => {
      setBuilding(await getBuildingById(buildingid));
      const _surveys = (await getAssignedSurveys()).filter(
        (s) => s.b_id === Number(buildingid)
      );
      setSurveys(_surveys);
    })();
  }, []);

  if (building)
    return (
      <main className="column">
        <ModifyBuildingForm building={building} />

        <LoadingList>
          <h3 className="padding1">Kyselyt</h3>
          {surveys.map((survey) => (
            <div key={survey.assigned_survey_id} className="list-item">
              <h4 style={{ flex: 1 }}>{survey.survey_title}</h4>
              <div style={{ flex: 1 }}>
                {survey.street}, {survey.post_code}, {survey.city}
              </div>
              <button
                onClick={() =>
                  navigate('/manager/surveys/' + survey.assigned_survey_id)
                }
              >
                Siirry
              </button>
            </div>
          ))}
        </LoadingList>
      </main>
    );
};

export default ManagerBuildingPage;
