import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSurvey from '../../../hooks/SurveyHook';
import {
  AssignedSurvey,
  Survey,
  SurveyStatus,
} from '../../../interfaces/Survey';
import { SurveyPreview } from '../../../components/SurveyPreview';
import { LoadingList } from '../../../components/lists/LoadingList';
import { ButtonLoading } from '../../../components/ButtonLoading';
import Tabs from 'react-bootstrap/Tabs';
import { Tab } from 'react-bootstrap';
import { SurveyBaseResults } from './SurveyBaseResults';

const SingleSurveyPage = () => {
  const { surveyid } = useParams();
  const { getSurveyById, deleteSurvey, getAssignedSurveys } = useSurvey();
  const [survey, setSurvey] = useState<Survey>();
  const [assignedSurveys, setAssignedSurveys] = useState<AssignedSurvey[]>([]);
  const [update, setUpdate] = useState(0);
  const handleUpdate = () => setUpdate(update + 1);

  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!surveyid) return;
    if (!confirm('Haluatko varmasti poistaa kyselyn?')) return;
    await deleteSurvey(surveyid);
  };

  const fetchSurvey = async () => {
    if (!surveyid) return;
    const res = await getSurveyById(surveyid);
    setSurvey(res);
  };

  useEffect(() => {
    fetchSurvey();
    (async () => {
      const _assignedSurveys = await getAssignedSurveys();
      const _filtered = _assignedSurveys.filter(
        (s) => s.survey_id === Number(surveyid)
      );
      setAssignedSurveys(_filtered);
    })();
  }, [update]);

  if (!survey || !surveyid) return <h1>Ei kyselyä</h1>;

  return (
    <main className="color3 margin1 column">
      <h1>{survey.survey_header.survey_title}</h1>
      <div className="flex-row">
        <SurveyPreview survey={survey} />

        <button
          className="colored"
          onClick={() =>
            navigate('/admin/surveys/create/' + survey.survey_header.survey_id)
          }
        >
          Luo kopio
        </button>
        {survey.survey_header.survey_status === SurveyStatus.UNPUBLISHED && (
          <ShareSurveyButton
            surveyid={survey.survey_header.survey_id}
            handleUpdate={handleUpdate}
          />
        )}

        <button className="delete" onClick={handleDelete}>
          Poista kysely
        </button>
      </div>
      <Tabs>
        <Tab eventKey="results" title="Tulokset">
          <SurveyBaseResults surveyid={Number(surveyid)} />
        </Tab>
        <Tab eventKey="assigned" title="Taloyhtiöt">
          <h1>Assigned surveys list</h1>
          <LoadingList>
            {assignedSurveys.map((survey) => (
              <div key={survey.assigned_survey_id} className="list-item">
                <h4 style={{ flex: 1 }}>{survey.survey_title}</h4>
                <div style={{ flex: 1 }}>
                  {survey.street}, {survey.post_code}, {survey.city}
                </div>
                <button
                  onClick={() =>
                    navigate(
                      `/manager/surveys/${surveyid}/assigned/${survey.assigned_survey_id}`
                    )
                  }
                >
                  Siirry
                </button>
              </div>
            ))}
          </LoadingList>
        </Tab>
      </Tabs>
    </main>
  );
};

const ShareSurveyButton = ({
  surveyid,
  handleUpdate,
}: {
  surveyid?: number;
  handleUpdate: () => void;
}) => {
  const { publishSurvey } = useSurvey();

  const onClick = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!surveyid) return alert('No survey id');
    await publishSurvey(surveyid);
    handleUpdate();
  };

  return <ButtonLoading text="Jaa kysely" onClick={onClick} />;
};

export default SingleSurveyPage;
