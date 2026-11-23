import { CateringBaseInfoDetailsRecord } from "@pages/Catering/BasicInfo/CateringBaseInfoDetails/@types/@foodBaseInfoDetails";

export type CateringBaseInfoDetailsEditDrawerFormData = {
  description?: string;
};

export type CateringBaseInfoDetailsEditDrawerContentProps = {
  closeDrawerHandler: () => void;
  getData: () => void;
  record: CateringBaseInfoDetailsRecord | null;
  productCategoryTitle: string;
};

export type updateBasicInfoFoodRequest = {
  id: number;
  title: string;
  description?: string;
  mainImage?: string;
  secondImage?: string;
  active?: boolean;
  productCategoryId: number;
  taxStuffId?: number;
};

export type updateBasicInfoFoodResponse = number;

export type viewBasicInfoFoodRequest = {
  id: number;
};

export type viewBasicInfoFoodResponse = {
  id: number;
  title: string;
  description: string;
  mainImage: string;
  mainImageUrl: string;
  secondImage: string;
  secondImageUrl: string;
  thirdImage?: string;
  thirdImageUrl?: string;
  fourthImage?: string;
  fourthImageUrl?: string;
  createdDate: string;
  modifiedDate: string;
  modifiedByUsername: string;
  modifiedBy: string;
  active: boolean;
  productCategoryId: number;
  productCategory: string;
  taxStuffId: number;
};
