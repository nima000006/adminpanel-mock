import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

export type CreateMyFoodScheduleSideRequest = {
  id: number;
  sidePlanTypeId: number;
  quantity: number;
  price: number;
};

export type CreateMyFoodScheduleRequest = {
  productId: number;
  startReservationDate: string;
  endReservationDate: string;
  fromDeliveryTime: string;
  toDeliveryTime: string;
  mealId: number;
  basePrice: number;
  requestType: number;
  limitedCount: boolean;
  maxCount: number;
  discount: number;
  maxTotalPerPerson: number;
  reserveDate: string;
  branches: number[];
  genderType: number;
  description: string;
  statusType: string;
  sideRequests: CreateMyFoodScheduleSideRequest[];
  staffTypes: number[];
  levels: number[];
  fields: number[];
};

export type CreateMyFoodScheduleResponse = GENERAL_RESPONSE<number>;
