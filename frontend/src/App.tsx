import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoutes from './ProtectedRoutes';
import {
  CreateSurvey,
  EditSurveyPage,
  HomePage,
  Login,
  PreviewPage,
  PropertiesPage,
  SurveyAnswerPage,
  SurveysPage,
  UserResultsPage,
  CreateUser,
  AdminHome,
} from './pages';
import { testSurvey } from './data/Survey';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/survey"
            element={<SurveyAnswerPage survey={testSurvey} />}
          />
          <Route path="/user-results" element={<UserResultsPage />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/create" element={<CreateSurvey />} />
            <Route path="/surveys" element={<SurveysPage />} />
            <Route path="/survey/edit" element={<EditSurveyPage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/adduser" element={<CreateUser />} />
            {/* <Route path="/preview" element={<PreviewPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;