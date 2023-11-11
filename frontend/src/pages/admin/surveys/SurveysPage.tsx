// Page that displays all surveys
import styles from './Surveys.module.css';
import { SurveyList } from '../../../components/lists/SurveyList';

const SurveysPage = () => {
  return (
    <div className={styles.container}>
      <SurveyList />
    </div>
  );
};

export default SurveysPage;
