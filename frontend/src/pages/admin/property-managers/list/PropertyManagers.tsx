import { useNavigate } from 'react-router-dom';
import { testUserList } from '../../../../data/TestUser';
import { User } from '../../../../interfaces/User';
import { MANAGERS_PATH } from '../../../../variables/RoutePaths';
import { useEffect, useState } from 'react';
import { useUser } from '../../../../hooks/UserHook';
import styles from '../Managers.module.css';

export const PropertyManagers = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState<User[]>([]);
  const [fullList, setFullList] = useState<User[]>([]);
  const { getUserList } = useUser();

  const fetchUserList = async () => {
    const users = await getUserList();
    if (!users) return;
    setUserList(users);
    setFullList(users);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    const filteredUsers = fullList.filter(
      (user) =>
        user.full_name.toLowerCase().includes(search.toLowerCase()) ||
        user.company.toLowerCase().includes(search.toLowerCase())
    );
    setUserList(filteredUsers);
  };

  useEffect(() => {
    fetchUserList();
  }, []);
  return (
    <div className={styles.container}>
      <div style={{ marginBottom: '1em' }}>
        <h1>Property managers</h1>
        <button onClick={() => navigate('/admin/adduser')}>
          Lisää isännöitsijä
        </button>
        <label>
          Hae isännöitsijää
          <input className="search-bar" onChange={handleSearch} />
        </label>
      </div>

      <div className={styles.managersList}>
        {userList.map((user: User) => (
          <div
            onClick={() => navigate(MANAGERS_PATH + '/' + user.user_id)}
            key={user.user_id}
            className={styles.listItem}
          >
            <h4>{user.full_name}</h4>
            <h4>{user.company}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
