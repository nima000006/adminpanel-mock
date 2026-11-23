import { FormInstance } from "antd";
import { Dayjs } from "dayjs";
import { Moment } from "jalali-moment";

import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

import { MyFoodScheduleDetailData } from "../../../@types/@foodScheduleTab";

//! LAYOUT
export type MyFoodScheduleTabDrawerContentProps = {
  closeDrawerHandler: () => void;
  getListData: () => void;
  foodScheduleInfo: MyFoodScheduleDetailData | null;
  isDrawerOpen: boolean;
};

type SelectType = {
  key: string;
  value: string;
  title: string;
  name: string;
  code: number;
  item: {
    id: number;
    title: string;
  };
};

export type MyFoodScheduleTabDrawerContentFormData = {
  activeMode: boolean;
  reserveDate: string;
  self: SelectType;
  contract: SelectType;
  meal: SelectType;
  foodScheduleType: SelectType;
  food: SelectType;
  universityUnit: SelectType[];
  discount: string;
  price: string;
  maxReserveCount: string;
  hasLimit: SelectType;
  foodTotalCount: string;
  reservationStartTime: string | Dayjs;
  reservationStartDate: string | Date | Moment;
  reservationEndTime: string | Dayjs;
  reservationEndDate: string | Date | Moment;
  deliverStartTime: string | Dayjs;
  deliverStartDate: string | Dayjs;
  deliverEndTime: string | Dayjs;
  deliverEndDate: string | Dayjs;
};

export type ReserveAndDeliverTimeDrawerProps = {
  form: FormInstance<MyFoodScheduleTabDrawerContentFormData>;
  foodScheduleInfo: MyFoodScheduleDetailData | null;
};

//! APIs
export type UpdateMyFoodScheduleResponse = GENERAL_RESPONSE<number>;

export type UpdateMyFoodScheduleRequest = {
  active: boolean;
  reserveDate: string;
  mealId: number;
  requestType: number;
  productId: number;
  branches: number[];
  discount: number;
  basePrice: number;
  maxTotalPerPerson: number;
  limitedCount: boolean;
  maxCount: number;
  startReservationDate: string;
  endReservationDate: string;
  fromDeliveryTime: string;
  toDeliveryTime: string;
  id: number;
};
