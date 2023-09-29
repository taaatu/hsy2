import { useNavigate } from 'react-router-dom';
import { testUserList } from '../../../data/TestUser';
import { User } from '../../../interfaces/User';
import { MANAGERS_PATH } from '../../../variables/RoutePaths';

export const PropertyMangers = () => {
  const navigate = useNavigate();
  return (
    <div className="centered-container">
      <h1>Property managers</h1>
      <button onClick={() => navigate('/admin/adduser')}>
        Lisää isännöitsijä
      </button>
      <div>
        {testUserList.map((user: User) => (
          <div
            onClick={() => navigate(MANAGERS_PATH + '/' + user.id)}
            key={user.id}
            style={{ display: 'flex', gap: '1em' }}
          >
            <h4>{user.full_name}</h4>
            <h4>{user.company}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
