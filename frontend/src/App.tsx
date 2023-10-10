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
  AddProperty,
  PropertyManagers,
  PropertyManagerPage,
} from './pages';
import { testSurvey } from './data/TestSurvey';
import { ManagerHome } from './pages/manager/ManagerHome';
import { MangerProperties } from './pages/manager/manager-properties/ManagerProperties';
import { ADD_PROPERTY_PATH, MANAGERS_PATH } from './variables/RoutePaths';
import { MainProvider } from './context/MainContext';
import { SingleSurveyPage } from './pages/admin/surveys/SingleSurveyPage';
import { UserGroup } from './interfaces/User';

function App() {
  return (
    <>
      <BrowserRouter>
        <MainProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/survey"
              element={<SurveyAnswerPage survey={testSurvey} />}
            />
            <Route path="/user-results" element={<UserResultsPage />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="admin"
              element={<ProtectedRoutes userGroup={UserGroup.ADMIN} />}
            >
              <Route index element={<AdminHome />} />
              <Route path="surveys">
                <Route index element={<SurveysPage />} />
                <Route path=":surveyid" element={<SingleSurveyPage />} />
                <Route path="create" element={<CreateSurvey />} />
              </Route>
              <Route path="managers">
                <Route index element={<PropertyManagers />} />
                <Route path=":userid" element={<PropertyManagerPage />} />
                <Route path="add" element={<CreateUser />} />
              </Route>
              <Route path="survey/edit" element={<EditSurveyPage />} />
              <Route path="properties" element={<PropertiesPage />} />
            </Route>

            <Route
              path="manager"
              element={<ProtectedRoutes userGroup={UserGroup.MANAGER} />}
            >
              <Route index element={<ManagerHome />} />
              <Route path="properties">
                <Route index element={<MangerProperties />} />
                <Route path="add" element={<AddProperty />} />
              </Route>
            </Route>
          </Routes>
        </MainProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
