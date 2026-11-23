import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type ShopAllVendorsDetailVendorProductsAdvanceFilterFormType = {
  stock: SelectType<IdTitle>;
  date: [string, string];
};

export type ShopAllVendorsDetailVendorProductsCategoryType = {
  level1?: IdTitleName;
  level2?: IdTitleName;
  level3?: IdTitleName;
};

export type ShopAllVendorsDetailVendorProductsRecordType = {
  uuid: string;
  bookUuid: string;
  title: string;
  isbn: string;
  discountedPrice: number | null;
  price: number;
  quantity: number;
  visible: boolean;
  createdDate: string;
  categories: ShopAllVendorsDetailVendorProductsCategoryType[];
};

//! APIs
export type GetVendorProductsDetailRequest = {
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
  title?: string;
  isbn?: string;
};

export type GetVendorProductsDetailResponse = {
  content: ShopAllVendorsDetailVendorProductsRecordType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
