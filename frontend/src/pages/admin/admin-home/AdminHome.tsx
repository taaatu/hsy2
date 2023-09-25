import { useNavigate } from 'react-router-dom';

export const AdminHome = () => {
  const navigate = useNavigate();
  return (
    <div className="centered-container">
      <button onClick={() => navigate('/admin/adduser')}>
        Lisää isännöitsijä
      </button>
    </div>
  );
};
