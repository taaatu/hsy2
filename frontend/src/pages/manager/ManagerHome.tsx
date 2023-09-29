import { useNavigate } from 'react-router-dom';

export const ManagerHome = () => {
  const navigate = useNavigate();
  return (
    <div className="centered-container">
      <h1>Property Manager home</h1>
      <button>Kyselyt</button>
      <button>Kiinteistöt</button>
      <button onClick={() => navigate('/manager/addproperty')}>
        Lisää kiinteistö
      </button>
    </div>
  );
};
