import { Link, useNavigate } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { CATERING_MY_FOOD_SCHEDULES_LIST_PAGE_ROUTE } from "@infra/router/routes/catering";
import { useCreateMyFoodScheduleMutation } from "@infra/states/redux/Apis/food/foodSchedule/foodScheduleApis";
import { ADD_FOOD_SCHEDULES_WIZARD_SCOPE } from "@pages/Catering/FoodSchedules/_shared/helper/components/AddFoodSchedulesWizard/@types/@addFoodSchedulesWizard";
import AddFoodSchedulesWizard from "@pages/Catering/FoodSchedules/_shared/helper/components/AddFoodSchedulesWizard/AddFoodSchedulesWizard";

const MyAddFoodSchedules = () => {
  const navigate = useNavigate();
  const [createMyFoodSchedule, { isLoading: isCreateMyFoodScheduleLoading }] =
    useCreateMyFoodScheduleMutation();

  useTitle({
    breadcrumbItems: [
      {
        title: "خانه",
        href: "/",
      },
      {
        title: (
          <Link to={CATERING_MY_FOOD_SCHEDULES_LIST_PAGE_ROUTE}>برنامه غذایی من</Link>
        ),
      },
      {
        title: "افزودن برنامه غذایی",
      },
    ],
  });

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <AddFoodSchedulesWizard
      scope={ADD_FOOD_SCHEDULES_WIZARD_SCOPE.MY}
      createFoodSchedule={(body) => createMyFoodSchedule(body).unwrap()}
      isCreateFoodScheduleLoading={isCreateMyFoodScheduleLoading}
      onCancel={() => navigate(CATERING_MY_FOOD_SCHEDULES_LIST_PAGE_ROUTE)}
    />
  );
};

export default MyAddFoodSchedules;
