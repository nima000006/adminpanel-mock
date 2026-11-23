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
} from "@pages/Food/Reservation/helpers/models/cancelledTableModel";

const MyCanceledFoodScheduleListTableModels = [
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

export default MyCanceledFoodScheduleListTableModels;
