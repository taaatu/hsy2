import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const SinglePropertyPage = () => {
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

export default SinglePropertyPage;
