import { Navigate, Outlet } from 'react-router-dom';
import { TopNavBar } from './components/TopNavBar';
import { TOKEN } from './variables/Constants';
import { useContext, useEffect, useState } from 'react';
import { MainContext } from './context/MainContext';
import { User, UserGroup } from './interfaces/User';
import { useUser } from './hooks/UserHook';

// https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c
type Props = {
  userGroup: UserGroup;
};

const ProtectedRoutes = ({ userGroup }: Props) => {
  const [curentUser, setCurentUser] = useState<Omit<User, 'password'> | null>();
  const { getUserByToken } = useUser();

  useEffect(() => {
    (async () => {
      const _user = await getUserByToken();
      console.log('checkToken: ', _user);
      setCurentUser(_user || null);
    })();
  }, []);

  if (curentUser !== undefined)
    return (
      <>
        {curentUser?.user_group == userGroup && (
          <>
            <TopNavBar isAdmin={userGroup === UserGroup.ADMIN} />
            <Outlet />
          </>
        )}

        {(curentUser === null || curentUser?.user_group !== userGroup) && (
          <Navigate to="/login" />
        )}
      </>
    );
};

export default ProtectedRoutes;
