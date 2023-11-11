import { lazy } from 'react';

export const AdminHome = lazy(() => import('./admin/AdminHome'));
export const CreateUserPage = lazy(() =>
  import('./admin/property-managers/CreateUserPage')
);
export const CreateSurvey = lazy(() =>
  import('./admin/surveys/create/CreateSurvey')
);
export const EditSurveyPage = lazy(() =>
  import('./admin/surveys/modify/EditSurveyPage')
);
export const PropertiesPage = lazy(() =>
  import('./admin/properties/PropertiesPage')
);
export const SurveysPage = lazy(() => import('./admin/surveys/SurveysPage'));
export { HomePage } from './home/Home';
export const LoginPage = lazy(() => import('./login/LoginPage'));
export const SurveyAnswerPage = lazy(() =>
  import('./resident/SurveyAnswerPage')
);
export const UserResultsPage = lazy(() =>
  import('./resident/results/UserResultsPage')
);
export const AddBuildingPage = lazy(() =>
  import('./manager/buildings/AddBuildingPage')
);
export const PropertyManagers = lazy(() =>
  import('./admin/property-managers/list/PropertyManagers')
);
export const PropertyManagerPage = lazy(() =>
  import('./admin/property-managers/single/ProperyManagerPage')
);
export const ProfilePage = lazy(() => import('./manager/profile/ProfilePage'));
export const SingleSurveyPage = lazy(() =>
  import('./admin/surveys/SingleSurveyPage')
);
export const SinglePropertyPage = lazy(() =>
  import('./admin/properties/SinglePropertyPage')
);
export const Logout = lazy(() => import('./Logout'));
export const ManagerSurveysPage = lazy(() =>
  import('./manager/surveys/ManagerSurveysPage')
);
export const ManagerSingleSurveyPage = lazy(() =>
  import('./manager/surveys/ManagerSingleSurveyPage')
);
export const ManagerProperties = lazy(() =>
  import('./manager/buildings/ManagerProperties')
);
export const ManagerHome = lazy(() => import('./manager/ManagerHome'));

export const ManagerBuildingPage = lazy(() =>
  import('./manager/buildings/ManagerBuildingPage')
);
export const ManagerBaseSurveyPage = lazy(() =>
  import('./manager/surveys/ManagerBaseSurveyPage')
);
