// import reactLogo from './assets/react.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import viteLogo from '/vite.svg';
import './App.css';
import SurveyPage from './pages/survey/SurveyPage';
import HomePage from './pages/home/Home';
import CreateSurvey from './pages/createsurvey/CreateSurvey';
import Login from './pages/login/Login';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/survey" element={<SurveyPage />} />
          <Route path="/create" element={<CreateSurvey />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
        </Routes>

        {/* <div>
          <a>
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a>
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card"> */}
        {/* <button onClick={() => setCount((count) => count + 1)}>
            count is 5
          </button> */}
        {/* <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p> */}
        {/* <Navigate to="/survey" /> */}
        {/* <SurveyPage /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
