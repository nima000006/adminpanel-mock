import { Link } from "react-router";

import { makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { REPORT_FOOD_ALL_FOOD_SCHEDULE_DETAILS_PAGE_ROUTE } from "@infra/router/routes/reports";
import {
  food,
  meal,
  type,
  totalFood,
  maxOrder,
  price,
  discount,
  startReserveDate,
  endReserveDate,
} from "@pages/Food/Reservation/helpers/models/cancelledTableModel";

import { AllCancelledFoodListByHolidayAndRestaurantTypes } from "../../../@types/@canceledDaysDetailDrawerContent";

const AllCanceledDaysDetailTableModel = [
  food,
  meal,
  type,
  totalFood,
  maxOrder,
  price,
  discount,
  startReserveDate,
  endReserveDate,
  {
    title: "",
    dataIndex: "id",
    key: "id",
    fixed: "right" as FixedType,
    width: 75,
    className: "tables-sticky-column-left",
    render: (value: number, records: AllCancelledFoodListByHolidayAndRestaurantTypes) => {
      return (
        <Link
          to={{
            pathname: REPORT_FOOD_ALL_FOOD_SCHEDULE_DETAILS_PAGE_ROUTE,
            search: makeSearchParams({
              id: value,
              date: records?.reserveDate,
              productId: records?.productId,
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

export default AllCanceledDaysDetailTableModel;
