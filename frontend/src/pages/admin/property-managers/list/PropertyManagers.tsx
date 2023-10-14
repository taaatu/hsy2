import { useNavigate } from 'react-router-dom';
import { User } from '../../../../interfaces/User';
import { MANAGERS_PATH } from '../../../../variables/RoutePaths';
import { useEffect, useState } from 'react';
import { useUser } from '../../../../hooks/UserHook';
import styles from '../Managers.module.css';
import { FaUser, FaUserPlus } from 'react-icons/fa';
import { SearchBar } from '../../../../components/SearchBar';

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
      <div
        style={{ marginBottom: '1em', gap: '1rem', flexWrap: 'wrap' }}
        className="flex-row center-align"
      >
        <SearchBar
          placeholder="Hae isännöitsijää"
          handleSearch={handleSearch}
        />
        <button
          className="center-align"
          style={{ gap: '0.5em' }}
          onClick={() => navigate('/admin/managers/add')}
        >
          <FaUserPlus size={20} />
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
