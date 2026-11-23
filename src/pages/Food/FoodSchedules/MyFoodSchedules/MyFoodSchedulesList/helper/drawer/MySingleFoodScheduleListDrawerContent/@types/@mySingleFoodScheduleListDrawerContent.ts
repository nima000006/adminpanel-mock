import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

//! LAYOUT
export type MySingleFoodScheduleListDrawerContentProps = {
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

export type MySingleFoodScheduleFormData = {
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
  reservationStartTime: string;
  reservationStartDate: string;
  reservationEndTime: string;
  reservationEndDate: string;
  deliverStartTime: string;
  deliverStartDate: string;
  deliverEndTime: string;
  deliverEndDate: string;
};

export type MyContractsList = {
  id: number;
  title: string;
  description: string;
  restaurantTitle: string;
  vendorTitle: string;
  createdDate: string;
  modifiedDate: string;
  restaurantId: number;
  vendorId: number;
  startedDate: string;
  endDate: string;
  providerPercentage: number;
  vendorPercentage: number;
  restaurantPercentage: number;
  active: boolean;
  status: number;
  contractUUID: number;
  deleted: null;
};

//! APIs
export type GetMyContractsBySelfIdResponse = GENERAL_RESPONSE<{
  contractDtoList: MyContractsList[];
  totalElements: number;
}>;

export type CreateNewMyFoodScheduleResponse = GENERAL_RESPONSE<number>;
export type CreateNewMyFoodScheduleRequest = {
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
};
