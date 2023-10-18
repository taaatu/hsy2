import { useNavigate, useParams } from 'react-router-dom';
import { User } from '../../../../interfaces/User';
import { useEffect, useState } from 'react';
import { useUser } from '../../../../hooks/UserHook';
import { MANAGERS_PATH } from '../../../../variables/RoutePaths';
import { ModifyUserForm } from '../../../../components/forms/ModifyUserForm';
import { ManagerProperties } from './ManagerProperties';
import styles from '../Managers.module.css';

export const PropertyManagerPage = () => {
  const { userid } = useParams();
  const navigate = useNavigate();
  const { getUserById, deleteUser } = useUser();
  const [isModifying, setIsModifying] = useState<boolean>(false);
  const [user, setUser] = useState<User>();

  const handleDelete = async () => {
    if (!user?.user_id) return;
    const res = await deleteUser(user.user_id);
    console.log('Delete user response: ', res);
    if (!res) {
      alert('Käyttäjän poisto epäonnistui');
      return;
    }
    alert('Käyttäjä poistettu');
    navigate(MANAGERS_PATH);
  };

  const fetchUser = async () => {
    if (!userid) return;
    const user = await getUserById(userid);
    if (!user) return;
    setUser(user);
    console.log('User: ', user);
  };

  useEffect(() => {
    fetchUser();
  }, [isModifying]);

  if (!user) return <div>Ei käyttäjää</div>;

  return (
    <div className={styles.container}>
      <div>
        {isModifying ? (
          <ModifyUserForm user={user} setIsModifying={setIsModifying} />
        ) : (
          <>
            <h4>Nimi: {user.full_name}</h4>
            <h4>Sähköposti: {user.email}</h4>
            <h4>Yritys: {user.company}</h4>
          </>
        )}
      </div>
      <div>
        <button onClick={() => setIsModifying(true)}>Muokkaa</button>
        <button style={{ backgroundColor: 'red' }} onClick={handleDelete}>
          Poista
        </button>
      </div>
      <ManagerProperties user={user} />
    </div>
  );
};
