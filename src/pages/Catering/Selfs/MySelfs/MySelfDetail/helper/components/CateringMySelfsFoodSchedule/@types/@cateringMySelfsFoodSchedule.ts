import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type CateringMySelfsFoodScheduleAdvanceFilterFormType = {
  product?: SelectType<IdTitle>[];
  meal?: SelectType<IdTitle>[];
  requestType?: SelectType<IdTitle>[];
  hasSidePlan?: SelectType<IdTitle>;
  date?: [string, string];
};

export type GetDetailMySelfsFoodScheduleRequest = {
  params: {
    pageSize: number;
    pageNumber: number;
    sortBy?: string;
    sortDirection?: string;
  };
  body: {
    fromReserveDate?: string;
    toReserveDate?: string;
    restaurantId?: number[];
    contractId?: number;
    productId?: number[];
    branchCode?: number;
    mealId?: number[];
    requestType?: number[];
    statusType?: number[];
    hasSidePlan?: boolean;
  };
};

export type GetDetailMySelfsFoodScheduleContent = {
  id: number;
  productId: number;
  productMainImage: string;
  productSecondImage: string;
  productThirdImage: string;
  productFourthImage: string;
  productDescription: string;
  restaurantTitle: string;
  remaining: number;
  productTitle: string;
  startReservationDate: string;
  endReservationDate: string;
  fromDeliveryTime: string;
  toDeliveryTime: string;
  fromCancelDate: string;
  toCancelDate: string;
  mealName: string;
  mealId: number;
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
  ratesCount: number;
  statusType: {
    id: number;
    title: string;
    faTitle: string;
  };
  productPlanDescription: string;
  description: string;
  contractId: number;
  vendorId: number;
  restaurantId: number;
  vendorTitle: string;
  branches: {
    branchCode: number;
    branchName: string;
  }[];
  requestTitle: string;
  restaurantAddress: string;
  ownerBranchName: string;
  ownerBranchCode: number;
  sidePlans: {
    id: number;
    sidePlanId: number;
    sidePlanTitle: string;
    sidePlanTypeId: number;
    sidePlanTypeTitle: string;
    productId: number;
    productTitle: string;
    quantity: number;
    totalAmount: number;
    price: number;
    currentCount: number;
  }[];
  staffTypes: number[];
  levels: number[];
  fields: number[];
  modifiedByUsername: string;
  modifiedBy: string;
  timer: string;
  sale: boolean;
  everyDay: boolean;
};

export type GetDetailMySelfsFoodScheduleResponse = {
  content: GetDetailMySelfsFoodScheduleContent[];
  totalElements: number;
  totalPages: number;
  last: boolean;
};

export type GetDetailMySelfsProductsRequest = {
  params: {
    pageSize: number;
    pageNumber: number;
    sortBy?: string;
    sortDirection?: string;
  };
  body: {
    title?: string;
    userTitle?: string;
    contractIds?: number[];
    restaurantIds?: number[];
    vendorIds?: number[];
    fromPrice?: number;
    toPrice?: number;
    statusType?: number[];
    baseProductIds?: number[];
    productCategories?: number[];
    branchIds?: number[];
  };
};

export type GetDetailMySelfsProductsContent = {
  id: number;
  title: string;
  userTitle: string;
  description: string;
  mainImage: string;
  secondImage: string;
  thirdImage: string;
  fourthImage: string;
  contractId: number;
  restaurantId: number;
  restaurantTitle: string;
  branchCode: number;
  branchName: string;
  vendorId: number;
  vendorName: string;
  studentalPrice: number;
  maxPrice: number;
  category: string;
  categoryId: number;
  productCategoryId: number;
  createdDate: string;
  modifiedDate: string;
  statusType: {
    id: number;
    title: string;
    faTitle: string;
  };
  rate: number;
  contractTitle: string;
  contractStatus: number;
  contractStatusTitle: string;
  provinceId: string;
  cityId: string;
  provinceTitle: string;
  cityTitle: string;
  vendorTitle: string;
  mainImageTitle: string;
  secondImageTitle: string;
  thirdImageTitle: string;
  fourthImageTitle: string;
  baseProductId: number;
  baseProductTitle: string;
  modifiedByUsername: string;
  modifiedBy: string;
};
export type GetDetailMySelfsProductsResponse = {
  content: GetDetailMySelfsProductsContent[];
  totalElements: number;
  totalPages: number;
  last: boolean;
};
