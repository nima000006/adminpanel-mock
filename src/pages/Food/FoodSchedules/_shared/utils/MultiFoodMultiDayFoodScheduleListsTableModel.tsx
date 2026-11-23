import CustomTag from "@components/Renderers/CustomTag/CustomTag";
import { FixedType } from "@infra/models/modules/GeneralTypes/GeneralTypes";

import {
  // MyFoodInfoType,
  MyTitleIdType,
} from "../../MyFoodSchedules/MyFoodSchedulesList/helper/drawer/MyMultiFoodMultiDayScheduleListDrawerContent/sections/MultiFoodMultiDayAllFoodScheduleLists/@types/@myMultiFoodMultiDayAllFoodScheduleLists";
// import { foodScheduleTypeData } from "./foodScheduleUtils";

export const food = {
  title: "غذا",
  dataIndex: "product",
  id: "product",
  width: 120,
  render: (value: MyTitleIdType) => <>{value?.title}</>,
};
export const type = {
  title: "نوع",
  dataIndex: "requestType",
  key: "requestType",
  width: 120,
  render: (value: MyTitleIdType) => {
    return (
      <CustomTag
        className="status"
        color={value?.id === 0 ? "green" : value?.id === 1 ? "geekblue" : "purple"}
      >
        {value?.id === 0 ? "دانشجویی" : value?.id === 1 ? "آزاد" : "روزفروش"}
      </CustomTag>
    );
  },
};
export const totalFood = {
  title: "تعداد کل غذا",
  dataIndex: "maxCount",
  id: "maxCount",
  width: 120,
};
export const maxOrder = {
  title: "حداکثر سفارش",
  dataIndex: "maxTotalPerPerson",
  id: "maxTotalPerPerson",
  width: 120,
  render: (value: string) => {
    return <>{value} </>;
    // Todo[Atefeh]: delete if not needed in the future
    // return <>{records?.requestType?.id === foodScheduleTypeData?.[1]?.id ? value : 1}</>;
  },
};
export const price = {
  title: "قیمت (ريال)",
  dataIndex: "basePrice",
  id: "basePrice",
  width: 120,
};
export const discount = {
  title: "تخفیف",
  dataIndex: "discount",
  id: "discount",
  width: 120,
};
export const TableModelId = {
  title: "",
  dataIndex: "id",
  key: "id",
  fixed: "right" as FixedType,
  width: 100,
  className: "tables-sticky-column-left",
};
