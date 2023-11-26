import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSurvey from '../../../hooks/SurveyHook';
import { Survey, SurveyStatus } from '../../../interfaces/Survey';
import { SurveyPreview } from '../../../components/SurveyPreview';
import { ButtonLoading } from '../../../components/ButtonLoading';
import Tabs from 'react-bootstrap/Tabs';
import { Tab } from 'react-bootstrap';
import { SurveyBaseResults } from './SurveyBaseResults';
import { AssignedSurveyList } from '../../../components/lists/AssignedSurveyList';

const SingleSurveyPage = () => {
  const { surveyid } = useParams();
  const { getSurveyById, deleteSurvey } = useSurvey();
  const [survey, setSurvey] = useState<Survey>();
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
          <AssignedSurveyList surveyid={Number(surveyid)} />
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
