import { useNavigate } from 'react-router-dom';
import { testUserList } from '../../../data/TestUser';
import { User } from '../../../interfaces/User';
import { MANAGERS_PATH } from '../../../variables/RoutePaths';
import { useEffect, useState } from 'react';
import { useUser } from '../../../hooks/UserHook';

export const PropertyMangers = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState<User[]>([]); // TODO: Replace with useUserList hook
  const { getUserList } = useUser();

  const fetchUserList = async () => {
    const users = await getUserList();
    if (!users) return;
    setUserList(users);
  };

  useEffect(() => {
    fetchUserList();
  }, []);
  return (
    <div className="centered-container">
      <h1>Property managers</h1>
      <button onClick={() => navigate('/admin/adduser')}>
        Lisää isännöitsijä
      </button>
      <div>
        {
          /*testUserList*/ userList.map((user: User) => (
            <div
              onClick={() => navigate(MANAGERS_PATH + '/' + user.user_id)}
              key={user.user_id}
              style={{ display: 'flex', gap: '1em' }}
            >
              <h4>{user.full_name}</h4>
              <h4>{user.company}</h4>
            </div>
          ))
        }
      </div>
    </div>
  );
};
