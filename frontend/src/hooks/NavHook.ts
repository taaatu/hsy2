import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../context/MainContext';
import { UserGroup } from '../interfaces/User';

const useNav = () => {
  const navigate = useNavigate();
  const { curentUser } = useContext(MainContext);

  const userRoute =
    curentUser?.user_group === UserGroup.ADMIN ? '/admin' : '/manager';

  const navigateBuildings = () => navigate(`${userRoute}/properties`);

  const navigateAssignedSurvey = (surveyid: number, assignedSurveyId: number) =>
    navigate(`${userRoute}/surveys/${surveyid}/assigned/${assignedSurveyId}`);

  return { navigateBuildings, navigateAssignedSurvey };
};

export default useNav;
