import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminRoutes from './AdminRoutes';
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
import { testSurvey } from './data/TestSurvey';
import { ManagerHome } from './pages/manager/ManagerHome';
import { AddProperty } from './pages/manager/add-property/AddProperty';
import { TopNavBar } from './components/TopNavBar';
import { PropertyManagerRoutes } from './PropertyManagerRoutes';
import { MangerProperties } from './pages/manager/manager-properties/ManagerProperties';
import { MANAGERS_PATH } from './variables/RoutePaths';
import { PropertyMangers } from './pages/admin/property-managers/PropertyManagers';
import { PropertyManager } from './pages/admin/property-managers/ProperyManager';

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
          <Route element={<AdminRoutes />}>
            <Route path="/admin/create" element={<CreateSurvey />} />
            <Route path="/surveys" element={<SurveysPage />} />
            <Route path="/survey/edit" element={<EditSurveyPage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/adduser" element={<CreateUser />} />
            <Route path={MANAGERS_PATH} element={<PropertyMangers />} />
            <Route
              path={MANAGERS_PATH + '/:userid'}
              element={<PropertyManager />}
            />
            {/* <Route path="/preview" element={<PreviewPage />} /> */}
          </Route>
          <Route element={<PropertyManagerRoutes />}>
            <Route path="/manager" element={<ManagerHome />} />
            <Route path="/manager/addproperty" element={<AddProperty />} />
            <Route path="/manager/properties" element={<MangerProperties />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
