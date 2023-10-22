import { useState } from 'react';
import { Survey } from '../interfaces/Survey';
import Modal from 'react-bootstrap/Modal';
import { AnswerSurveyForm } from './forms/AnswerSurveyForm';

type Props = {
  survey: Survey;
};

export const SurveyPreview = ({ survey }: Props) => {
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const handleOpen = () => setShowPreview(true);

  const handleClose = () => setShowPreview(false);

  return (
    <>
      <button type="button" onClick={handleOpen}>
        Esikatsele
      </button>
      <Modal
        show={showPreview}
        onHide={handleClose}
        size="lg"
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Kyselyn esikatselu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AnswerSurveyForm survey={survey} isPreview={true} />
        </Modal.Body>
      </Modal>
    </>
  );
};
