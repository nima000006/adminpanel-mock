import { Link } from "react-router";

import { CustomColumnType } from "@components/Renderers/CustomTable/CustomTable";
import { makeSearchParams } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { FOOD_MY_DETAIL_FOOD_SCHEDULE_ROUTE } from "@infra/router/routes/food";
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

import { MyCancelledFoodListByHolidayAndRestaurantTypes } from "../../../@types/@myCanceledDaysDetailDrawerContent";

const MyCanceledDaysDetailTableModel: CustomColumnType<MyCancelledFoodListByHolidayAndRestaurantTypes>[] =
  [
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
      render: (
        value: number,
        records: MyCancelledFoodListByHolidayAndRestaurantTypes
      ) => {
        return (
          <Link
            to={{
              pathname: FOOD_MY_DETAIL_FOOD_SCHEDULE_ROUTE,
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

export default MyCanceledDaysDetailTableModel;
