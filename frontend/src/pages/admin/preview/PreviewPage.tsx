import PropTypes from 'prop-types';
import SurveyAnswerPage from '../../resident/answer-survey/SurveyAnswerPage';

const PreviewPage = ({ survey }) => {
  return (
    <div>
      {/* <h1>Preview</h1>
      <h2>{survey.title ?? 'Ei nimeä'}</h2>
      <p>{survey.description ?? 'Ei kuvausta'}</p> */}
      <SurveyAnswerPage survey={survey} />
    </div>
  );
};

PreviewPage.propTypes = {
  survey: PropTypes.object.isRequired,
};

export default PreviewPage;
