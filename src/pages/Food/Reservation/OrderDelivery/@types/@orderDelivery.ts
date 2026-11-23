import { Dayjs } from "dayjs";

import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

//! LAYOUTs
export type OrderDeliverySearchFOrmType = {
  currentDate: Dayjs;
  username: string;
  studentNumber: string;
};

export type DeliverBasketPlanDTO = {
  firstName: null;
  lastName: null;
  userName: string;
  studentNumber: null;
  mobile: null;
  restaurantTitle: string;
  branchCode: number;
  branchName: string;
  id: number;
  planId: number;
  productId: number;
  productTitle: string;
  productMainImage: string;
  basketId: number;
  quantity: number;
  delivered: boolean;
  startReservationDate: string;
  endReservationDate: string;
  fromDeliveryTime: string;
  toDeliveryTime: string;
  mealId: number;
  mealName: string;
  basePrice: number;
  discount: number;
  tax: null;
  reserveType: number;
  reserveName: null;
  requestType: number;
  limitedCount: boolean;
  maxCount: number;
  reservationsCount: number;
  maxTotalPerPerson: number;
  reserveDate: string;
  rate: number;
  ratesCount: null;
  description: string;
  sale: null;
  base: boolean;
  everyDay: boolean;
  deliveryStatus: {
    id: number;
    title: string;
    faTitle: string;
  };
};

export type GetBasketPlanByUsernameResponse = GENERAL_RESPONSE<{
  basketPlansDtos: DeliverBasketPlanDTO[];
  totalElements: number;
  totalPages: null;
}>;
export type GetBasketPlanByUsernameRequest = {
  query: string;
};

export type DeliverUserPlanByIdResponse = GENERAL_RESPONSE<30562>;
export type DeliverUserPlanByIdRequest = {
  basketPlanId: string;
  deliveryStatus?: number; // برای قسمت های داینامیک رزرو این رو optional گذاشتم
};
