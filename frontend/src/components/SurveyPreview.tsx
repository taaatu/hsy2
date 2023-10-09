import { useState } from 'react';
import SurveyAnswerPage from '../pages/resident/answer-survey/SurveyAnswerPage';
import { Survey } from '../interfaces/Survey';
import styles from './Components.module.css';

type Props = {
  survey: Survey;
};

export const SurveyPreview = ({ survey }: Props) => {
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const handleOpen = () => {
    setShowPreview(true);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setShowPreview(false);
    document.body.style.overflow = 'visible';
  };

  return (
    <>
      <button type="button" onClick={handleOpen}>
        Esikatsele
      </button>
      {showPreview && (
        <>
          <div className={styles.previewModal}>
            <div className={styles.modalContent}>
              <header style={{ padding: '5px' }}>
                <button onClick={handleClose}>Piilota</button>
              </header>
              <div className={styles.modalBody}>
                <SurveyAnswerPage survey={survey} isPreview={true} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
