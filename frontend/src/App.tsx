import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// import ProtectedRoutes from './ProtectedRoutes';
import { lazy } from 'react';
const ProtectedRoutes = lazy(() => import('./ProtectedRoutes'));
import {
  CreateSurvey,
  EditSurveyPage,
  HomePage,
  LoginPage,
  PropertiesPage,
  SurveyAnswerPage,
  SurveysPage,
  UserResultsPage,
  CreateUserPage,
  AdminHome,
  AddBuildingPage,
  PropertyManagers,
  PropertyManagerPage,
  ProfilePage,
  SinglePropertyPage,
  SingleSurveyPage,
  Logout,
  ManagerSurveysPage,
  ManagerSingleSurveyPage,
  ManagerProperties,
  ManagerHome,
} from './pages';
import { MainProvider } from './context/MainContext';
import { UserGroup } from './interfaces/User';
import { PagesWrapper } from './PagesWrapper';

function App() {
  return (
    <>
      <BrowserRouter>
        <MainProvider>
          <Routes>
            <Route element={<PagesWrapper />}>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/survey/:surveyid"
                element={<SurveyAnswerPage isPreview={false} />}
              />
              <Route path="/survey/results" element={<UserResultsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/logout" element={<Logout />} />

              <Route
                path="admin"
                element={<ProtectedRoutes userGroup={UserGroup.ADMIN} />}
              >
                <Route index element={<AdminHome />} />
                <Route path="surveys">
                  <Route index element={<SurveysPage />} />
                  <Route path=":surveyid" element={<SingleSurveyPage />} />
                  <Route path="create/:surveyid?" element={<CreateSurvey />} />
                </Route>
                <Route path="managers">
                  <Route index element={<PropertyManagers />} />
                  <Route path=":userid" element={<PropertyManagerPage />} />
                  <Route path="add" element={<CreateUserPage />} />
                </Route>
                <Route path="survey/edit" element={<EditSurveyPage />} />
                <Route path="properties">
                  <Route index element={<PropertiesPage />} />
                  <Route path=":buildingid" element={<SinglePropertyPage />} />
                </Route>
              </Route>

              <Route
                path="manager"
                element={<ProtectedRoutes userGroup={UserGroup.MANAGER} />}
              >
                <Route index element={<ManagerHome />} />
                <Route path="properties">
                  <Route index element={<ManagerProperties />} />
                  <Route path="add" element={<AddBuildingPage />} />
                  <Route
                    path=":buildingid"
                    element={
                      <>
                        <h1>Single building page</h1>
                      </>
                    }
                  />
                </Route>
                <Route path="surveys">
                  <Route index element={<ManagerSurveysPage />} />
                  <Route
                    path=":surveyid"
                    element={<ManagerSingleSurveyPage />}
                  />
                </Route>
                <Route path="profile">
                  <Route index element={<ProfilePage />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </MainProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
