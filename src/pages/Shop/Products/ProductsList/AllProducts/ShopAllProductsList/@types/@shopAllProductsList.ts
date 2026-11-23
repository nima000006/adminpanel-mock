import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type ShopAllProductsListRecordType = {
  uuid: string;
  title: string;
  isbn: string;
  supplier: {
    uuid: string;
    title: string;
  };
  reviewReason: string;
  rejectReason: IdTitleName;
  rejectDescription: string;
  visible: boolean;
  status: IdTitleName;
  createdDate: string;
};

export type ShopAllProductsListAdvanceFilterFormType = {
  displayStatus: SelectType<IdTitleName>;
};

//! APIs
export type GetShopAllProductsListRequest = {
  title?: string;
  isbn?: string;
  supplierTitle?: string;
  statuses?: string;
  visible?: boolean;
  createdFrom?: string;
  createdTo?: string;
  pageSize: number;
  pageNumber: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC" | string;
};

export type GetShopAllProductsListResponse = {
  content: ShopAllProductsListRecordType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
