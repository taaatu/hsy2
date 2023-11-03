import { useEffect, useState } from 'react';
import { User } from '../../../interfaces/User';
import { useUser } from '../../../hooks/UserHook';
import { ModifyUserForm } from '../../../components/forms/ModifyUserForm';

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isModifying, setIsModifying] = useState<boolean>(false);
  const { getUserByToken, deleteUser } = useUser();

  const handleDelete = async () => {
    if (!user?.user_id) return;
    await deleteUser(user.user_id);
  };

  useEffect(() => {
    (async () => {
      const _user = await getUserByToken();
      console.log('checkToken: ', _user);
      setUser(_user || null);
    })();
  }, []);

  if (user)
    return (
      <div style={{ padding: '1em' }}>
        <main>
          {isModifying ? (
            <ModifyUserForm user={user} setIsModifying={setIsModifying} />
          ) : (
            <>
              <h4>Nimi: {user.full_name}</h4>
              <h4>Sähköposti: {user.email}</h4>
              <h4>Yritys: {user.company}</h4>{' '}
              <div>
                <button onClick={() => setIsModifying(true)}>Muokkaa</button>
                <button
                  style={{ backgroundColor: 'red' }}
                  onClick={handleDelete}
                >
                  Poista
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    );
};

export default ProfilePage;
