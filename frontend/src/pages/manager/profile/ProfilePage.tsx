import { useEffect, useState } from 'react';
import { User } from '../../../interfaces/User';
import { useUser } from '../../../hooks/UserHook';
import { ModifyProfile } from './ModifyProfile';

export const ProfilePage = () => {
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
            <ModifyProfile user={user} setIsModifying={setIsModifying} />
          ) : (
            <>
              <div>{user.full_name}</div>
              <div>{user.email}</div>
              <div>{user.company}</div>{' '}
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
