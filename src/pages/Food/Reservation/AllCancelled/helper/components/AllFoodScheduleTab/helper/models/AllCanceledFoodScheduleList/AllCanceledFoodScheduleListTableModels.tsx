import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { AllCancelledFoodListDataType } from "@pages/Food/Reservation/AllCancelled/helper/components/AllFoodScheduleTab/@types/@allFoodScheduleTab";
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

const AllCanceledFoodScheduleListTableModels: CustomColumnType<AllCancelledFoodListDataType>[] =
  [
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
