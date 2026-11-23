import { FormInstance } from "antd";

import { GENERAL_RESPONSE } from "../../../../../../infrastructure/models/modules/GeneralTypes/GeneralTypes";

//! APIs
export type FoodDataType = {
  id: number;
  title: string;
  restaurantId: number;
  contractRestaurantTitle: string;
  contractId?: number;
  contractTitle: string;
  studentalPrice: number;
  minPrice: number;
  maxPrice: number;
  active: boolean;
  contractVendorTitle?: string;
};
export type GetFoodsListResponse = GENERAL_RESPONSE<{
  productDtos: FoodDataType[];
  totalElements: number;
}>;
export type GetFoodsListRequest = {
  pageNo: number;
  pageSize: number;
  isDeleted: boolean;
};

// advanced modal

export type FoodsAdvanceFilterModalProps = {
  isModalOpen: boolean;
  onSubmit: ({ contract, food, self, vendor, slider }: AdvancedFilterFormType) => void;
  closeModalHandler: () => void;
  title?: string;
  isDangerous?: boolean;
  centered?: boolean;
  isConfirmButtonLoading?: boolean;
  isConfirmButtonDisable?: boolean;
  confirmBtnText?: string;
  customClass?: string;
  width?: number;
  htmlType?: "submit" | "button" | "reset" | undefined;
  titleIcon?: React.ReactNode;
  form: FormInstance<AdvancedFilterFormType>;
  pageType: string;
};

type Select = {
  label: string;
  title: string;
  value: string;
  key: number;
  item: object;
  code: number;
};

export type AdvancedFilterFormType = {
  self: Select;
  contract: Select;
  food: Select;
  vendor: Select;
  slider?: [number, number];
};
export type FoodType = {
  id: number;
  title: string;
  description: string;
  mainImage: string;
  secondImage: null;
  thirdImage: null;
  fourthImage: null;
  contractId: number;
  restaurantId: null;
  restaurantTitle: null;
  vendorId: null;
  vendorName: null;
  studentalPrice: number;
  minPrice: number;
  maxPrice: number;
  category: string;
  categoryId: number;
  createdDate: null;
  modifiedDate: string;
  deleted: boolean;
  active: boolean;
  rate: number;
  contractTitle: string;
  contractRestaurantTitle: string;
  contractVendorTitle: string;
  mainImageTitle: null;
  secondImageTitle: null;
  thirdImageTitle: null;
  fourthImageTitle: null;
};
export type GetAllFoodByFilterResponse = GENERAL_RESPONSE<{
  productDtos: FoodType[];
  totalElements: number;
}>;
export type GetAllFoodByFilterRequest = {
  Boolean?: "true" | "false";
  isDeleted?: "true" | "false";
  pageNo?: string;
  pageSize?: string;
  contractId?: string;
  maxPrice?: string;
  minPrice?: string;
  branchCode?: string;
  productTitle?: string;
  restaurantId?: string;
  vendorId?: string;
};
