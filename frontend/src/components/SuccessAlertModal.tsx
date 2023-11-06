import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

type Props = {
  message: string;
  show: boolean;
  navRoute?: string;
};

export const SuccessAlertModal = ({ show, message, navRoute }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navRoute ? navigate(navRoute) : navigate(0);
  };

  return (
    <Modal show={show}>
      <Modal.Body className="center-align column">
        <FaCheckCircle size={60} color="green" />
        <h4>{message}</h4>
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: 'center' }}>
        <button onClick={handleClick}>OK</button>
      </Modal.Footer>
    </Modal>
  );
};
