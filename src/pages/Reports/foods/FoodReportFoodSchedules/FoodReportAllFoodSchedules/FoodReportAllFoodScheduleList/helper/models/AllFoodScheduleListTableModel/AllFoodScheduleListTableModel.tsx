import { Link } from "react-router";

import { makeSearchParams } from "@infra/helpers/utils";
import { REPORT_FOOD_ALL_FOOD_SCHEDULE_DETAILS_PAGE_ROUTE } from "@infra/router/routes/reports";
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
} from "@pages/Reports/foods/FoodReportFoodSchedules/_shared/utils/FoodScheduleListTableModel";
import { FoodScheduleWithFilterPlanDTO } from "@pages/Reports/foods/FoodReportSelfs/FoodReportMySelfs/FoodReportMyDetailSelf/helpers/components/FoodSchedule/@types/foodSchedule";

import { FoodSchedule } from "../../../@types/@allFoodScheduleList";

const AllFoodScheduleListTableModel = () => {
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
      render: (value: number, records: FoodScheduleWithFilterPlanDTO | FoodSchedule) => {
        return (
          <Link
            to={{
              pathname: REPORT_FOOD_ALL_FOOD_SCHEDULE_DETAILS_PAGE_ROUTE,
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
export default AllFoodScheduleListTableModel;
