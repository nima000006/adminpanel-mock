import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
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
import { MyCancelledFoodListDataType } from "@pages/Food/Reservation/MyCancelled/helper/components/MyFoodScheduleTab/@types/@myFoodScheduleTab";

const MyCanceledFoodScheduleListTableModels: CustomColumnType<MyCancelledFoodListDataType>[] =
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

export default MyCanceledFoodScheduleListTableModels;
