import { HashRouter, Route, Routes } from 'react-router-dom';
// import './App.css';
// import ProtectedRoutes from './ProtectedRoutes';
import { lazy } from 'react';
const ProtectedRoutes = lazy(() => import('./ProtectedRoutes'));
import {
  CreateSurveyPage,
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
  // SinglePropertyPage,
  SingleSurveyPage,
  Logout,
  ManagerSurveysPage,
  ManagerSingleSurveyPage,
  ManagerProperties,
  ManagerHome,
  ManagerBuildingPage,
  ManagerBaseSurveyPage,
} from './pages';
import { MainProvider } from './context/MainContext';
import { UserGroup } from './interfaces/User';
import { PagesWrapper } from './PagesWrapper';

const App = () => {
  return (
    <>
      <HashRouter>
        <MainProvider>
          <Routes>
            <Route element={<PagesWrapper />}>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/survey/:surveyid"
                element={<SurveyAnswerPage isPreview={false} />}
              />
              <Route
                path="/survey/:key/results"
                element={<UserResultsPage />}
              />
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
                  <Route
                    path=":surveyid/assigned/:id"
                    element={<ManagerSingleSurveyPage />}
                  />
                  <Route
                    path="create/:surveyid?"
                    element={<CreateSurveyPage />}
                  />
                </Route>
                <Route path="managers">
                  <Route index element={<PropertyManagers />} />
                  <Route path=":userid" element={<PropertyManagerPage />} />
                  <Route path="add" element={<CreateUserPage />} />
                </Route>
                <Route path="survey/edit" element={<EditSurveyPage />} />
                <Route path="properties">
                  <Route index element={<PropertiesPage />} />
                  <Route path=":buildingid" element={<ManagerBuildingPage />} />
                </Route>
                <Route path="profile" element={<ProfilePage />} />
              </Route>

              <Route
                path="manager"
                element={<ProtectedRoutes userGroup={UserGroup.MANAGER} />}
              >
                <Route index element={<ManagerHome />} />
                <Route path="properties">
                  <Route index element={<ManagerProperties />} />
                  <Route path="add" element={<AddBuildingPage />} />
                  <Route path=":buildingid" element={<ManagerBuildingPage />} />
                </Route>
                <Route path="surveys">
                  <Route index element={<ManagerSurveysPage />} />
                  <Route path=":surveyid" element={<ManagerBaseSurveyPage />} />
                  <Route
                    path=":surveyid/assigned/:id"
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
      </HashRouter>
    </>
  );
};

export default App;
