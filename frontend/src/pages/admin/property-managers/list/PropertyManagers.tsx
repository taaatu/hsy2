import { useNavigate } from 'react-router-dom';
import { testUserList } from '../../../../data/TestUser';
import { User } from '../../../../interfaces/User';
import { MANAGERS_PATH } from '../../../../variables/RoutePaths';
import { useEffect, useState } from 'react';
import { useUser } from '../../../../hooks/UserHook';
import styles from '../Managers.module.css';
import { FaUser } from 'react-icons/fa';

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
      <div style={{ marginBottom: '1em' }} className="flex-row">
        {/* <h1>Property managers</h1> */}
        <label>
          Hae isännöitsijää
          <input className="search-bar" onChange={handleSearch} />
        </label>
        <button onClick={() => navigate('/admin/adduser')}>
          Lisää isännöitsijä
        </button>
      </div>

      <div className={styles.managersList}>
        {userList.map((user: User) => (
          <div key={user.user_id} className={styles.listItem}>
            <div
              style={{ gap: '0.5em', width: '20ch' }}
              className="center-align"
            >
              <FaUser /> {user.full_name}{' '}
            </div>
            <div style={{ width: '30ch' }}>{user.company}</div>
            <button
              onClick={() => navigate(MANAGERS_PATH + '/' + user.user_id)}
            >
              Siirry profiiliin
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
