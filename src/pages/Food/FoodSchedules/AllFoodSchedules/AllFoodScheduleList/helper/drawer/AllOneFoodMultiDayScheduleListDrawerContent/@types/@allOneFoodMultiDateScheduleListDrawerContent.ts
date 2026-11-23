import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

//! LAYOUT
export type AllOneFoodMultiDayScheduleListDrawerContentProps = {
  closeDrawerHandler: () => void;
  getListData: () => void;
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

export type AllOneFoodMultiDayScheduleFormData = {
  activeMode: boolean;
  reserveDate: string[];
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
  reservationStart: SelectType;
  reservationEnd: SelectType;
  deliverStartTime: string;
  deliverEndTime: string;
  startReservation: string;
  endReservation: string;
};

//! APIs
export type CreateNewAllBulkFoodScheduleResponse = GENERAL_RESPONSE<number>;

export type CreateNewAllBulkFoodScheduleRequest = {
  active: boolean;
  basePrice: number;
  branches: number[];
  discount: number;
  endReservationDate: number;
  fromDeliveryTimeHour: number;
  fromDeliveryTimeMinute: number;
  limitedCount: boolean;
  maxCount: number;
  maxTotalPerPerson: number;
  mealId?: number;
  productId?: number;
  requestType: number;
  reserveDates: string[];
  startReservationDate: number;
  toDeliveryTimeHour: number;
  toDeliveryTimeMinute: number;
  endReservationHour: number;
  startReservationHour: number;
  startReservationMinute: number;
  endReservationMinute: number;
};
