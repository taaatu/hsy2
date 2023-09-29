import { useParams } from 'react-router-dom';
import { u1 } from '../../../data/TestUser';
import { User } from '../../../interfaces/User';
import { useState } from 'react';

export const PropertyManager = () => {
  const { userid } = useParams();
  const [isModifying, setIsModifying] = useState<boolean>(false);
  const user = u1;
  const handleDelete = () => {
    alert('Poistetaan käyttäjä');
    // TODO: Delete user API call
  };
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
      <div>Taloyhtiöt:</div>
    </div>
  );
};
type ModifyUserProps = {
  user: User;
  setIsModifying: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModifyUser = ({ user, setIsModifying }: ModifyUserProps) => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [company, setCompany] = useState<string>();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModifying(false);
    const modifiedUser: Partial<User> = {
      full_name: name,
      email: email,
      company: company,
    };
    console.log('Modified user: ', modifiedUser);
    // TODO: Modify user API call
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Nimi
          <input
            type="text"
            defaultValue={user.full_name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Sähköposti
          <input
            type="email"
            defaultValue={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Yritys
          <input
            type="text"
            defaultValue={user.company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>
        <button>Tallenna</button>
      </form>
    </div>
  );
};
