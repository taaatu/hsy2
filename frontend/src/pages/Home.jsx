import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      {/* <Navigate to="/survey" /> */}
      <h1>Log in User</h1>
      <p>Visual result Page,
        Property Manager Log in,
        PM Main Pnpm age,
        PM Make survey ,
        PM Previev Survey,
        PM Your Surveys,
        PM View/Edit Survey,
        PM Survey Results
      </p>
      <Link to="/survey">Survey</Link>
    </div>
  );
};

export default HomePage;
