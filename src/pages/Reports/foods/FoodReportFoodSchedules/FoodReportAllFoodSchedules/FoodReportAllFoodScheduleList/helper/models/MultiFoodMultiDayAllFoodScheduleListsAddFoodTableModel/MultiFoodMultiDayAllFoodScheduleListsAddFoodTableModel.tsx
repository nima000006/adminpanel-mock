import {
  food,
  type,
  totalFood,
  maxOrder,
  price,
  discount,
} from "@pages/Reports/foods/FoodReportFoodSchedules/_shared/utils/MultiFoodMultiDayFoodScheduleListsTableModel";

const AllMultiFoodMultiDayAllFoodScheduleListsAddFoodTableModel = () => {
  return [food, type, totalFood, maxOrder, price, discount];
};
export default AllMultiFoodMultiDayAllFoodScheduleListsAddFoodTableModel;
