import { useParams } from 'react-router-dom';
import { User } from '../../../../interfaces/User';
import { useEffect, useState } from 'react';
import { useUser } from '../../../../hooks/UserHook';
import { ModifyUserForm } from '../../../../components/forms/ModifyUserForm';
import styles from '../Managers.module.css';
import { BuildingList } from '../../../../components/lists/BuildingList';

const PropertyManagerPage = () => {
  const { userid } = useParams();
  const { getUserById } = useUser();
  const [user, setUser] = useState<User>();

  const fetchUser = async () => {
    if (!userid) return;
    const user = await getUserById(userid);
    if (!user) return;
    setUser(user);
    console.log('User: ', user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) return <div>Ei käyttäjää</div>;

  return (
    <div className={styles.container}>
      <h1>Isännöitsijän tiedot</h1>
      <ModifyUserForm user={user} isAdmin={true} />
      <h4>Taloyhtiöt</h4>
      <BuildingList userid={user.user_id} />
    </div>
  );
};

export default PropertyManagerPage;
