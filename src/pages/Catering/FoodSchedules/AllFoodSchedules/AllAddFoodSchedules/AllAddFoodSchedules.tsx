import { Link, useNavigate } from "react-router";

import useTitle from "@infra/helpers/GeneralHelpers/useTitle/useTitle";
import { CATERING_ALL_FOOD_SCHEDULES_LIST_PAGE_ROUTE } from "@infra/router/routes/catering";
import { useCreateAllFoodScheduleMutation } from "@infra/states/redux/Apis/food/foodSchedule/foodScheduleApis";
import { ADD_FOOD_SCHEDULES_WIZARD_SCOPE } from "@pages/Catering/FoodSchedules/_shared/helper/components/AddFoodSchedulesWizard/@types/@addFoodSchedulesWizard";
import AddFoodSchedulesWizard from "@pages/Catering/FoodSchedules/_shared/helper/components/AddFoodSchedulesWizard/AddFoodSchedulesWizard";

const AllAddFoodSchedules = () => {
  const navigate = useNavigate();
  const [createAllFoodSchedule, { isLoading: isCreateAllFoodScheduleLoading }] =
    useCreateAllFoodScheduleMutation();

  useTitle({
    breadcrumbItems: [
      {
        title: "خانه",
        href: "/",
      },
      {
        title: (
          <Link to={CATERING_ALL_FOOD_SCHEDULES_LIST_PAGE_ROUTE}>برنامه غذایی همه</Link>
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
      scope={ADD_FOOD_SCHEDULES_WIZARD_SCOPE.ALL}
      createFoodSchedule={(body) => createAllFoodSchedule(body).unwrap()}
      isCreateFoodScheduleLoading={isCreateAllFoodScheduleLoading}
      onCancel={() => navigate(CATERING_ALL_FOOD_SCHEDULES_LIST_PAGE_ROUTE)}
    />
  );
};

export default AllAddFoodSchedules;
