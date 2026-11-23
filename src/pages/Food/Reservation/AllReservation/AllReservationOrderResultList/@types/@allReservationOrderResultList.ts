import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

export type AllReservationExcelFormType = { count?: string; totalItems?: ["all"] };

export type AdminBasketType = {
  firstName: string;
  lastName: string;
  userName: string;
  studentNumber: null;
  mobile: string;
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
  tax: number;
  reserveType: number;
  reserveName: string;
  requestType: number;
  limitedCount: boolean;
  maxCount: number;
  reservationsCount: number;
  maxTotalPerPerson: number;
  reserveDate: string;
  rate: number;
  ratesCount: null;
  description: string;
  sale: boolean;
  base: boolean;
  everyDay: boolean;
  deliveryStatus: {
    id: number;
    title: string;
    faTitle: string;
  };
};
export type GetAdminAllBasketDataResponse = GENERAL_RESPONSE<{
  basketPlansDtos: AdminBasketType[];
  totalElements: number;
  totalPages: number;
}>;
export type GetAdminAllBasketDataRequest = {
  pageNo: string;
  pageSize: string;
};

export type FilterAdminReservationsResponse = GetAdminAllBasketDataResponse;
export type FilterAdminReservationsRequest = {
  queryString: string;
  // pageNo: string;
  // pageSize: string;
  // branchCode?: string;
  // username?: string;
  // studentNumber?: string;
  // restaurantId?: string;
  // requestType?: string;
  // mobile?: string;
  // mealId?: string;
  // lastName?: string;
  // firstName?: string;
  // fromDate?: string;
  // toDate?: string;
  // delivered?: boolean;
};

export type RestaurantByBranchIdDataType = {
  id: number;
  title: string;
  description: string;
  rules: string;
  ownerBranchCodeBranchCode: number;
  ownerBranchCodeBranchName: string;
  genderType: number;
  logoName: string;
  coverName: string;
  logoTitle: null;
  coverTitle: null;
  phone: string;
  managerUserName: string;
  managerFirstName: string;
  managerLastName: string;
  managerUserId: null;
  latitude: number;
  longitude: number;
  score: null;
  modifiedDate: null;
  createdDate: string;
  deleted: false;
  status: null;
  capacity: number;
  branchDtos: null;
  restaurantPhone: string;
  provinceName: string;
  provinceId: number;
  provinceStateName: string;
  provinceStateId: number;
  address: string;
  postalCode: string;
  active: boolean;
  private: boolean;
};

export type GetRestaurantByBranchIdResponse = {
  status: number;
  msg: string;
  data: RestaurantByBranchIdDataType[];
  errors: null;
};

export type GetFoodsByRestaurantIdMealIdAndDateRequest = {
  fromDate: string;
  mealId: string;
  restaurantId: string;
  toDate: string;
};

export type FoodsByRestaurantIdMealIdAndDateType = {
  id: number;
  productId: number;
  productMainImage: string;
  restaurantTitle: string;
  restaurantId: number;
  branchCode: number;
  branchName: string;
  remaining: number;
  productTitle: string;
  startReservationDate: string;
  endReservationDate: string;
  fromDeliveryTime: string;
  toDeliveryTime: string;
  mealName: string;
  mealId: number;
  basePrice: number;
  discount: 0;
  tax: null;
  requestType: number;
  limitedCount: true;
  maxCount: number;
  reservationsCount: number;
  maxTotalPerPerson: number;
  reserveDate: string;
  productDescription: null;
  rate: number;
  ratesCount: null;
  currentCount: null;
  productContractRestaurantTitle: null;
  productContractRestaurantDescription: null;
  description: null;
  productContractRestaurantAddress: string;
  productContractRestaurantOwnerBranchCodeBranchName: string;
  productContractRestaurantOwnerBranchCodeBranchCode: number;
  sale: null;
};

export type GetFoodsByRestaurantIdMealIdAndDateResponse = {
  status: number;
  msg: string;
  data: [
    {
      simplePlanDtos: FoodsByRestaurantIdMealIdAndDateType[];
      date: string;
    },
  ];
  errors: null;
};

export type CreateHolidaysResponse = {
  status: number;
  msg: string;
  data: [
    {
      id: number;
      branch: {
        branchCode: number;
        branchName: string;
      };
      restaurant: {
        id: number;
        title: string;
        description: string;
        rules: string;
        ownerBranchCode: {
          branchCode: number;
          branchName: string;
        };
        genderType: number;
        logoName: string;
        coverName: string;
        phone: string;
        managerUserName: string;
        managerFirstName: string;
        managerLastName: string;
        managerUserId: null;
        latitude: number;
        longitude: number;
        score: null;
        branch: [
          {
            branchCode: number;
            branchName: string;
          },
        ];
        province: {
          id: number;
          name: string;
          state: {
            id: number;
            name: string;
          };
        };
        createdDate: null;
        modifiedDate: null;
        modifiedByUsername: null;
        deleted: false;
        status: null;
        capacity: number;
        address: string;
        postalCode: string;
        restaurantPhone: string;
        active: true;
        private: false;
      };
      plan: null;
      reserveDate: string;
      createdByUsername: string;
      createdDate: string;
      deleted: boolean;
    },
  ];
  errors: null;
};

export type CreateHolidaysRequest = {
  branchCode: number | string;
  planId?: number | string;
  reserveDate: string;
  restaurantId?: number | string | null;
}[];
