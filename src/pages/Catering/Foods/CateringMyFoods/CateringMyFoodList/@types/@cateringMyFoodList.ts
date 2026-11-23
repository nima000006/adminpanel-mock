import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type CateringMyFoodListAdvanceFilterFormType = {
  baseProduct?: SelectType<IdTitle>[];
  contract?: SelectType<IdTitle>[];
  restaurant?: SelectType<IdTitle>[];
  vendor?: SelectType<IdTitle>[];
};

export type DeactiveMyFoodRequest = {
  id: number;
  statusType: number;
  deActiveReason?: number;
};

export type DeactiveMyFoodResponse = void;

export type CreateMyFoodRequest = {
  title: string;
  userTitle: string;
  description: string;
  mainImage?: string | null;
  secondImage?: string | null;
  thirdImage?: string | null;
  fourthImage?: string | null;
  studentalPrice: number;
  maxPrice: number;
  contractId: number;
  statusType: number;
  productBaseId: number;
};

export type CreateMyFoodResponse = number;

export type ViewMyFoodRequest = {
  id: number;
};

export type ViewMyFoodResponse = {
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
  deActiveReason: {
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
