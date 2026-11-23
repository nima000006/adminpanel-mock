import { FormInstance } from "antd";

import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type ShopAllProductsDetailUuidTitleType = {
  uuid: string;
  title: string;
};

export type ShopAllProductsDetailCategoryRowType = {
  level1?: ShopAllProductsDetailUuidTitleType;
  level2?: ShopAllProductsDetailUuidTitleType;
  level3?: ShopAllProductsDetailUuidTitleType;
};

export type ShopAllProductsDetailGroupedCategoryRowType = {
  level1?: ShopAllProductsDetailUuidTitleType;
  level2?: ShopAllProductsDetailUuidTitleType;
  level3: ShopAllProductsDetailUuidTitleType[];
};

export type ShopAllProductsDetailCategoryFormRowType = {
  layer1?: string | SelectType<ShopAllProductsDetailUuidTitleType>;
  layer2?: string | SelectType<ShopAllProductsDetailUuidTitleType>;
  layer3?: Array<string | SelectType<ShopAllProductsDetailUuidTitleType>>;
};

export type ShopAllProductsDetailFormType = {
  visible?: boolean;
  categories: ShopAllProductsDetailCategoryFormRowType[];
};

export type ShopAllProductsDetailCategoryPickerProps = {
  form: FormInstance<ShopAllProductsDetailFormType>;
  categories?: ShopAllProductsDetailGroupedCategoryRowType[];
  isSaveLoading?: boolean;
  onSave?: () => void;
};

export type ShopAllProductsDetailRecordType = {
  uuid: string;
  supplierUuid: string;
  supplierTitle: string;
  discountedPrice: number;
  price: number;
  quantity: number;
  createdDate: string;
  visible: boolean;
};

//! APIs
export type GetShopAllProductsDetailRequest = {
  uuid: string;
};

export type GetShopAllProductsDetailResponse = {
  uuid: string;
  title: string;
  description: string;
  isbn: string;
  author: string;
  subject: string;
  coverType: string;
  bookSize: string;
  volumeCount: number;
  pageCount: number;
  sellerCount: number;
  publisher: ShopAllProductsDetailUuidTitleType;
  visible: boolean;
  status: IdTitleName;
  reviewReason: string;
  rejectReason: IdTitleName;
  rejectDescription: string;
  createdDate: string;
  reviewedAt: string;
  supplier: ShopAllProductsDetailUuidTitleType;
  coverImageUrl?: string | null;
  imageUrls: string[];
  categories: ShopAllProductsDetailCategoryRowType[];
};

export type GetShopAllProductsDetailSupplierBooksRequest = {
  uuid: string;
  pageSize: number;
  pageNumber: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC" | string;
  priceFrom?: number;
  priceTo?: number;
  visible?: boolean;
  supplierUuids?: string[];
  supplierTitle?: string;
};

export type GetShopAllProductsDetailSupplierBooksResponse = {
  content: ShopAllProductsDetailRecordType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type HideShopAllProductsDetailRequest = {
  uuid: string;
};

export type HideShopAllProductsDetailResponse = {
  uuid: string;
  title: string;
  description: string;
  isbn: string;
  author: string;
  subject: string;
  coverType: string;
  bookSize: string;
  volumeCount: number;
  pageCount: number;
  publisher: ShopAllProductsDetailUuidTitleType;
  visible: boolean;
  status: IdTitleName;
  reviewReason: string;
  rejectReason: IdTitleName;
  rejectDescription: string;
  coverImageUuid: string;
  imageUuids: string[];
  categories: ShopAllProductsDetailUuidTitleType[];
};

export type HideShopAllProductsDetailSupplierBookRequest = {
  uuid: string;
};

export type HideShopAllProductsDetailSupplierBookResponse = {
  uuid: string;
  bookUuid: string;
  title: string;
  isbn: string;
  discountedPrice: number;
  price: number;
  quantity: number;
  createdDate: string;
  visible: boolean;
  categories: ShopAllProductsDetailCategoryRowType[];
};

export type UpdateShopAllProductsDetailRequest = {
  uuid: string;
  body: {
    faTitle?: string;
    enTitle?: string;
    arTitle?: string;
    faDescription?: string;
    enDescription?: string;
    arDescription?: string;
    isbn?: string;
    author?: string;
    publisherUuid?: string;
    coverImageUuid?: string;
    categoryUuids?: string[];
  };
};

export type UpdateShopAllProductsDetailResponse = {
  uuid: string;
  title: string;
  description: string;
  isbn: string;
  author: string;
  subject: string;
  coverType: string;
  bookSize: string;
  volumeCount: number;
  pageCount: number;
  publisher: ShopAllProductsDetailUuidTitleType;
  visible: boolean;
  status: IdTitleName;
  reviewReason: string;
  rejectReason: IdTitleName;
  rejectDescription: string;
  coverImageUuid: string;
  imageUuids: string[];
  categories: ShopAllProductsDetailUuidTitleType[];
};

export type ShopAllProductsDetailTableModelProps = {
  onVisibleChange: (uuid: string, checked: boolean) => void;
  pendingUuid?: string | null;
  pendingVisible?: boolean | null;
  isVisibleLoading?: boolean;
};
