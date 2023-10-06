import { useNavigate, useParams } from 'react-router-dom';
import { User } from '../../../../interfaces/User';
import { useEffect, useState } from 'react';
import { useUser } from '../../../../hooks/UserHook';
import { MANAGERS_PATH } from '../../../../variables/RoutePaths';
import { ModifyUser } from './ModifyUser';
import { testProperties } from '../../../../data/TestProperties';

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
    <div className="centered-container">
      <h1>Property Manager</h1>
      <h1>User id {userid}</h1>
      <div>
        {isModifying ? (
          <ModifyUser user={user} setIsModifying={setIsModifying} />
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
      <h4>Taloyhtiöt:</h4>
      <ul>
        {testProperties.map((property) => (
          <div
            style={{ backgroundColor: 'white', display: 'flex', gap: '2em' }}
            key={property.id}
          >
            <p>{property.address}</p>
            <p>{property.city}</p>
            <p>{property.postcode} </p>
          </div>
        ))}
      </ul>
    </div>
  );
};
