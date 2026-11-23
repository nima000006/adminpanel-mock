import { FormInstance } from "antd";
import { Dayjs } from "dayjs";
import { Moment } from "jalali-moment";

import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

import { FoodScheduleDetailData } from "../../../@types/@foodScheduleTab";

//! LAYOUT
export type AllFoodScheduleTabDrawerContentProps = {
  closeDrawerHandler: () => void;
  getData: () => void;
  foodScheduleInfo: FoodScheduleDetailData | null;
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

export type AllFoodScheduleEditDrawerFormData = {
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
  form: FormInstance<AllFoodScheduleEditDrawerFormData>;
  foodScheduleInfo: FoodScheduleDetailData | null;
};

//! APIs
export type UpdateAllFoodScheduleResponse = GENERAL_RESPONSE<number>;

export type UpdateAllFoodScheduleRequest = {
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
  startReservationDate: string | Date | Moment;
  endReservationDate: string;
  fromDeliveryTime: string;
  toDeliveryTime: string;
  id: number;
};
