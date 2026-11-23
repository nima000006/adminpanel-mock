import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { dataPlaceHolder } from "@infra/helpers/utils";
import CustomMealTags from "@pages/Food/_shared/utils/CustomMealTags/CustomMealTags";

import { AllCancelledFoodListDataType } from "../../AllCancelled/helper/components/AllFoodScheduleTab/@types/@allFoodScheduleTab";

export const foodScheduleDate = {
  title: "تاریخ برنامه غذایی",
  dataIndex: "reserveDate",
  key: "reserveDate",
  width: 130,
  render: (value?: string) => {
    if (value) {
      return dataPlaceHolder({ data: value, isDate: true });
    }
  },
};

export const reasonCancellation = {
  title: "علت لغو",
  dataIndex: "requestReasonTitle",
  key: "requestReasonTitle",
  width: 100,
};

export const self = {
  title: "سلف",
  dataIndex: "productContractRestaurantTitle",
  key: "productContractRestaurantTitle",
  width: 125,
};

export const type = {
  title: "نوع",
  dataIndex: "requestType",
  key: "requestType",
  width: 130,
  render: (value: number, records: AllCancelledFoodListDataType) => {
    return (
      <CustomTag color={value === 0 ? "green" : value === 1 ? "geekblue" : "purple"}>
        {records?.requestTitle}
      </CustomTag>
    );
  },
};

export const food = {
  title: "غذا",
  dataIndex: "productTitle",
  key: "productTitle",
  width: 150,
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

export const totalFood = {
  title: "تعداد کل غذا",
  dataIndex: "maxCount",
  key: "maxCount",
  width: 130,
  render: (value: string, records: AllCancelledFoodListDataType) => {
    return records?.limitedCount ? value : "بدون محدودیت";
  },
};

export const maxOrder = {
  title: "حداکثر سفارش",
  dataIndex: "maxTotalPerPerson",
  key: "maxTotalPerPerson",
  width: 130,
};

export const price = {
  title: "قیمت (ت)",
  dataIndex: "basePrice",
  key: "basePrice",
  width: 150,
  render: (value: string) => {
    return <>{dataPlaceHolder({ data: value, isPrice: true, isRial: true })}</>;
  },
};

export const discount = {
  title: "تخفیف",
  dataIndex: "discount",
  key: "discount",
  width: 125,
};

export const startReserveDate = {
  title: "شروع رزرو",
  dataIndex: "startReservationDate",
  key: "startReservationDate",
  width: 150,
  render: (value: string) => {
    return (
      <>
        {dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm YYYY/MM/DD",
        })}
      </>
    );
  },
};

export const endReserveDate = {
  title: "پایان رزرو",
  dataIndex: "endReservationDate",
  key: "endReservationDate",
  width: 150,
  render: (value: string) => {
    return (
      <>
        {dataPlaceHolder({
          data: value,
          isDate: true,
          customDateFormat: "HH:mm YYYY/MM/DD",
        })}
      </>
    );
  },
};

export const foodScheduleStatus = {
  title: "وضعیت",
  dataIndex: "active",
  id: "active",
  width: 120,
  render: (value: string) => {
    return (
      <CustomTag color={value ? "green" : "red"}>{value ? "فعال" : "غیرفعال"}</CustomTag>
    );
  },
};

// tab2
export const date = {
  title: "تاریخ",
  dataIndex: "reserveDate",
  key: "reserveDate",
  width: 150,
  render: (value: string) => {
    return (
      <>
        {dataPlaceHolder({
          data: value,
          isDate: true,
          // customDateFormat: "YYYY/MM/DD HH:mm",
        })}
      </>
    );
  },
};
