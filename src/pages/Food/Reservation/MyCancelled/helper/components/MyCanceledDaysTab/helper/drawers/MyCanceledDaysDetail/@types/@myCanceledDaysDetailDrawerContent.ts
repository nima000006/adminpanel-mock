//! LAYOUTs
export type MyCanceledDaysDetailDrawerContentProps = {
  closeDrawerHandler: () => void;
  isDrawerOpen: {
    isOpen: boolean;
    id: number;
    date: string;
  };
};

//! APIs
export type MyRestaurantListByHolidayIdType = {
  id: number;
  title: string;
};

export type GetMyRestaurantListByHolidayIdResponse = {
  status: number;
  msg: string;
  data: MyRestaurantListByHolidayIdType[];
  errors: null;
};

export type GetMyCancelledFoodListByHolidayAndRestaurantRequest = {
  holidayId: number;
  pageNo: string;
  pageSize: string;
  restaurantId: number;
};

export type MyCancelledFoodListByHolidayAndRestaurantTypes = {
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

export type GetMyCancelledFoodListByHolidayAndRestaurantResponse = {
  status: number;
  msg: string;
  data: {
    planDtos: MyCancelledFoodListByHolidayAndRestaurantTypes[];
    totalElements: number;
    totalPages: null;
  };
  errors: null;
};

export type MyCollapseDataType = MyRestaurantListByHolidayIdType & {
  tableData: {
    data: MyCancelledFoodListByHolidayAndRestaurantTypes[];
    isLoading: boolean;
  };
};
