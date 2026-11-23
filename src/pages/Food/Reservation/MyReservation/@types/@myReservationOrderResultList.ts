export type MyReservationExcelFormType = { count?: string; totalItems?: ["all"] };

export type GetMyFoodsByRestaurantIdMealIdAndDateRequest = {
  fromDate: string;
  mealId: string;
  restaurantId: string;
  toDate: string;
};

export type MyFoodsByRestaurantIdMealIdAndDateType = {
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
  discount: number;
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

export type GetMyFoodsByRestaurantIdMealIdAndDateResponse = {
  status: number;
  msg: string;
  data: [
    {
      simplePlanDtos: MyFoodsByRestaurantIdMealIdAndDateType[];
      date: string;
    },
  ];
  errors: null;
};

export type CreateMyHolidaysResponse = {
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

export type CreateMyHolidaysRequest = {
  planId?: number | string;
  reserveDate: string;
  restaurantId?: number | string | null;
  reasonType: number | string;
}[];
