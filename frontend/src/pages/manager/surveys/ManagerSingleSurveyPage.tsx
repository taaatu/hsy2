import { useParams } from 'react-router-dom';

export const ManagerSingleSurveyPage = () => {
  const { surveyid } = useParams();
  return (
    <div>
      <h1>ManagerSingleSurveyPage id: {surveyid}</h1>
    </div>
  );
};
