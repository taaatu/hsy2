import { useEffect, useState } from 'react';
import { User } from '../../../interfaces/User';
import { useUser } from '../../../hooks/UserHook';
import { ModifyUserForm } from '../../../components/forms/ModifyUserForm';

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const { getUserByToken } = useUser();

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
          <>
            <ModifyUserForm user={user} />
          </>
        </main>
      </div>
    );
};

export default ProfilePage;
