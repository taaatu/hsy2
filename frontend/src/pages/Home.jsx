import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      {/* <Navigate to="/survey" /> */}
      <h1>Home</h1>
      <Link to="/survey">Survey</Link>
    </div>
  );
};

export default HomePage;
