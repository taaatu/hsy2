import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SurveyAnswerPage from './pages/answer-survey/SurveyAnswerPage';
import HomePage from './pages/home/Home';
import CreateSurvey from './pages/createsurvey/CreateSurvey';
import Login from './pages/login/Login';
import SurveysPage from './pages/surveys/SurveysPage';
import PreviewPage from './pages/preview/PreviewPage';
import EditSurveyPage from './pages/edit-survey/EditSurveyPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/survey" element={<SurveyAnswerPage />} />
          <Route path="/create" element={<CreateSurvey />} />
          <Route path="/login" element={<Login />} />
          <Route path="/surveys" element={<SurveysPage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/survey/edit" element={<EditSurveyPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
