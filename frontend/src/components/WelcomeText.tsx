import { useContext } from 'react';
import { MainContext } from '../context/MainContext';

export const WelcomeText = () => {
  const { curentUser } = useContext(MainContext);
  return (
    <div className="centered-container">
      <h2 style={{ marginTop: '4rem', textAlign: 'center' }}>
        Tervetuloa Himaan {curentUser?.full_name}!
      </h2>
      <h4 style={{ textAlign: 'center', marginTop: '2rem' }}>
        Hima on täällä tekemässä kiinteistöjen hallinnastasi entistä helpompaa.{' '}
        <br />
        Kaikki hoituu Himassa!
      </h4>
    </div>
  );
};
