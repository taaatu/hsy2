import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const navigate = useNavigate();
  return (
    <div className="centered-container">
      <h1>Super Admin home</h1>
      <button onClick={() => navigate('/admin/create')} className="buttonadmin">
        Luo kysely
      </button>
      <button
        onClick={() => navigate('/admin/adduser')}
        className="buttonadmin"
      >
        Lisää isännöitsijä
      </button>
    </div>
  );
};

export default AdminHome;
