import { useNavigate } from 'react-router-dom';
import { User } from '../../../../interfaces/User';
import { MANAGERS_PATH } from '../../../../variables/RoutePaths';
import { useEffect, useState } from 'react';
import { useUser } from '../../../../hooks/UserHook';
import styles from '../Managers.module.css';
import { FaUser, FaUserPlus } from 'react-icons/fa';
import { SearchBar } from '../../../../components/SearchBar';
import { LoadingList } from '../../../../components/lists/LoadingList';

const PropertyManagers = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const { getUserList } = useUser();

  const filteredUsers = userList.filter((user) => {
    return (
      user.full_name.toLowerCase().includes(search.toLowerCase()) ||
      user.company.toLowerCase().includes(search.toLowerCase())
    );
  });

  const fetchUserList = async () => {
    const users = await getUserList();
    if (!users) return;
    setUserList(users);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Isännöitsijät</h1>
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

      <LoadingList>
        {filteredUsers.map((user: User) => (
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
      </LoadingList>
    </div>
  );
};

export default PropertyManagers;
