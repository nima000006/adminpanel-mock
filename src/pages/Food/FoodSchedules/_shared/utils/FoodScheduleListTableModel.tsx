import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import CustomMealTags from "@pages/Food/_shared/utils/CustomMealTags/CustomMealTags";
import { FoodScheduleWithFilterPlanDTO } from "@pages/Food/Selfs/MySelfs/MyDetailSelf/helpers/components/FoodSchedule/@types/foodSchedule";

import { FoodSchedule } from "../../AllFoodSchedules/AllFoodScheduleList/@types/@allFoodScheduleList";

export const reserveDate = {
  title: "تاریخ برنامه غذایی",
  dataIndex: "reserveDate",
  key: "reserveDate",
  width: 130,
  render: (value: string) => {
    return <>{dataPlaceHolder({ data: value, isDate: true })}</>;
  },
};
export const scheduleSelf = {
  title: "سلف",
  dataIndex: "productContractRestaurantTitle",
  key: "productContractRestaurantTitle",
  width: 170,
};
export const scheduleType = {
  title: "نوع",
  dataIndex: "requestType",
  key: "requestType",
  width: 120,
  render: (value: number) => {
    return (
      <CustomTag
        className="status"
        color={value === 0 ? "green" : value === 1 ? "geekblue" : "purple"}
      >
        {value === 0 ? "دانشجویی" : value === 1 ? "آزاد" : "روزفروش"}
      </CustomTag>
    );
  },
};
export const scheduleFood = {
  title: "غذا",
  dataIndex: "productTitle",
  key: "productTitle",
  width: 170,
};
export const meal = {
  title: "وعده",
  dataIndex: "mealName",
  key: "mealName",
  width: 120,
  render: (value: string) => {
    return <CustomMealTags value={value} />;
  },
};
export const maxCount = {
  title: "حداکثر سفارشات",
  dataIndex: "maxCount",
  key: "maxCount",
  width: 130,
  render: (value: string, records: FoodScheduleWithFilterPlanDTO | FoodSchedule) => {
    return <>{records?.limitedCount ? value : "بدون محدودیت"}</>;
  },
};
export const maxTotalPerPerson = {
  title: "حداکثر تعداد سفارشات هر نفر",
  dataIndex: "maxTotalPerPerson",
  key: "maxTotalPerPerson",
  width: 200,
};
export const reservationsCount = {
  title: "تعداد سفارشات گرفته شده",
  dataIndex: "reservationsCount",
  key: "reservationsCount",
  width: 200,
};
export const basePrice = {
  title: "قیمت (ریال)",
  dataIndex: "basePrice",
  key: "basePrice",
  width: 130,
  render: (value?: string) => {
    if (value) {
      return <>{dataPlaceHolder({ data: value, isPrice: true })}</>;
    } else {
      return value;
    }
  },
};
export const discount = {
  title: "تخفیف",
  dataIndex: "discount",
  key: "discount",
  width: 130,
  render: (value: string) => {
    return <>{`% ${value}`}</>;
  },
};
export const tartReservationDate = {
  title: "شروع رزرو",
  dataIndex: "startReservationDate",
  key: "startReservationDate",
  width: 150,
  render: (value: string) => {
    return <>{dataPlaceHolder({ data: value, isDate: true, hasSpecialTime: true })}</>;
  },
};
export const endReservationDate = {
  title: "پایان رزرو",
  dataIndex: "endReservationDate",
  key: "endReservationDate",
  width: 150,
  render: (value: string) => {
    return <>{dataPlaceHolder({ data: value, isDate: true, hasSpecialTime: true })}</>;
  },
};
export const scheduleStatus = {
  title: "وضعیت",
  dataIndex: "active",
  key: "active",
  width: 120,
  render: (value: boolean) => {
    return (
      <CustomTag className="status" color={value ? "green" : "red"}>
        {value ? "فعال" : "غیر فعال"}
      </CustomTag>
    );
  },
};
export const TableModelId = {
  title: "",
  dataIndex: "id",
  key: "id",
  fixed: "right" as FixedType,
  width: 150,
  className: "tables-sticky-column-left",
};
