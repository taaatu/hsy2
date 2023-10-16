import { useParams } from 'react-router-dom';
import useBuilding from '../../../hooks/BuildingHook';
import { useEffect } from 'react';

export const SinglePropertyPage = () => {
  const { buildingid } = useParams();

  useEffect(() => {
    (async () => {
      console.log(buildingid);
    })();
  }, []);

  return (
    <div>
      <h1>Single Property Page {buildingid}</h1>
    </div>
  );
};
