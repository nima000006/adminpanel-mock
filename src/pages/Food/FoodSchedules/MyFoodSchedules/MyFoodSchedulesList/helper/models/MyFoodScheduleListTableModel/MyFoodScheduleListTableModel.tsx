import { Link } from "react-router";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { FOOD_MY_DETAIL_FOOD_SCHEDULE_ROUTE } from "@infra/router/routes/food";
import {
  basePrice,
  discount,
  endReservationDate,
  maxCount,
  maxTotalPerPerson,
  meal,
  reservationsCount,
  reserveDate,
  scheduleFood,
  scheduleSelf,
  scheduleStatus,
  scheduleType,
  TableModelId,
  tartReservationDate,
} from "@pages/Food/FoodSchedules/_shared/utils/FoodScheduleListTableModel";
import { FoodSchedule } from "@pages/Food/FoodSchedules/MyFoodSchedules/MyFoodSchedulesList/@types/@myFoodSchedulesList";
import { FoodScheduleWithFilterPlanDTO } from "@pages/Food/Selfs/MySelfs/MyDetailSelf/helpers/components/FoodSchedule/@types/foodSchedule";

const MyFoodScheduleListTableModel = (): CustomColumnType<
  FoodSchedule | FoodScheduleWithFilterPlanDTO
>[] => {
  return [
    reserveDate,
    scheduleSelf,
    scheduleType,
    scheduleFood,
    meal,
    maxCount,
    maxTotalPerPerson,
    reservationsCount,
    basePrice,
    discount,
    tartReservationDate,
    endReservationDate,
    scheduleStatus,
    {
      ...TableModelId,
      title: "",
      dataIndex: "id",
      key: "id",
      fixed: "right" as FixedType,
      width: 100,
      className: "tables-sticky-column-left",
      render: (value: number, records: FoodScheduleWithFilterPlanDTO | FoodSchedule) => {
        return (
          <Link
            to={{
              pathname: FOOD_MY_DETAIL_FOOD_SCHEDULE_ROUTE,
              search: makeSearchParams({
                id: value,
                date: records?.reserveDate,
                productId: records?.productId,
                contractId: records?.productContractId,
              }),
            }}
            className="text-link"
          >
            مشاهده
          </Link>
        );
      },
    },
  ];
};
export default MyFoodScheduleListTableModel;
