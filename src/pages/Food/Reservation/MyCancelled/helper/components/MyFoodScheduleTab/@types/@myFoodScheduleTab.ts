//! APIs
export type GetMyCancelledFoodListRequest = {
  pageNo: number;
  pageSize: number;
};

export type MyCancelledFoodListDataType = {
  id: number;
  productId: number;
  productMainImage: string;
  productSecondImage: null;
  productThirdImage: null;
  productFourthImage: null;
  productDescription: string;
  restaurantTitle: null;
  productContractRestaurantTitle: string;
  remaining: null;
  productTitle: string;
  startReservationDate: string;
  endReservationDate: string;
  fromDeliveryTime: string;
  toDeliveryTime: string;
  mealName: string;
  mealId: number;
  basePrice: number;
  subsidizedPrice: null;
  exceededPrice: null;
  dailyPrice: null;
  discount: number;
  tax: null;
  reserveType: number;
  reserveName: null;
  maxSubsidizedCount: null;
  dynamicPrice: boolean;
  requestType: number;
  limitedCount: boolean;
  maxCount: number;
  reservationsCount: number;
  maxTotalPerPerson: number;
  reserveDate: string;
  rate: number;
  ratesCount: null;
  deleted: boolean;
  productPlanDescription: string;
  description: null;
  active: boolean;
  productContractId: string;
  productContractVendorId: null;
  productContractRestaurantId: string;
  productContractTitle: string;
  productContractVendorTitle: string;
  branches: {
    branchCode: number;
    branchName: string;
  }[];
  requestTitle: string;
  productContractRestaurantAddress: string;
  productContractRestaurantOwnerBranchCodeBranchName: string;
  productContractRestaurantOwnerBranchCodeBranchCode: number;
  currentCount: null;
  sale: null;
  base: boolean;
  timer: null;
  everyDay: boolean;
};

export type GetMyCancelledFoodListResponse = {
  status: number;
  msg: string;
  data: {
    planDtos: MyCancelledFoodListDataType[];
    totalElements: number;
    totalPages: null;
  };
  errors: null;
};
