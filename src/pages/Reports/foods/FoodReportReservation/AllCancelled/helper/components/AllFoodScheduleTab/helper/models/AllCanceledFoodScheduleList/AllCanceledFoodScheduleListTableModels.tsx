import {
  discount,
  endReserveDate,
  food,
  foodScheduleDate,
  foodScheduleStatus,
  maxOrder,
  meal,
  price,
  reasonCancellation,
  self,
  startReserveDate,
  totalFood,
  type,
} from "@pages/Reports/foods/FoodReportReservation/helpers/models/cancelledTableModel";

const AllCanceledFoodScheduleListTableModels = [
  foodScheduleDate,
  reasonCancellation,
  self,
  type,
  food,
  meal,
  totalFood,
  maxOrder,
  price,
  discount,
  startReserveDate,
  endReserveDate,
  foodScheduleStatus,
];

export default AllCanceledFoodScheduleListTableModels;
