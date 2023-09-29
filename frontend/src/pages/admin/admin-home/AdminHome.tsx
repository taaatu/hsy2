import { useNavigate } from 'react-router-dom';

export const AdminHome = () => {
  const navigate = useNavigate();
  return (
    <div className="centered-container">
      <h1>Super Admin home</h1>
      <button onClick={() => navigate('/admin/create')}>Luo kysely</button>
      <button onClick={() => navigate('/admin/adduser')}>
        Lisää isännöitsijä
      </button>
    </div>
  );
};
