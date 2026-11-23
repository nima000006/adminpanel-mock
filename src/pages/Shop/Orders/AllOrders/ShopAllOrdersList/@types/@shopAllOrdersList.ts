import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type ShopAllOrdersListTabVariant =
  | "all"
  | "pendingApproval"
  | "readyToShip"
  | "shipped"
  | "rejected"
  | "cancelled"
  | "expired";

export type ShopAllOrdersListAdvanceFilterFormType = {
  date: [string, string];
};

// APIs
export type GetShopAllOrdersListCountResponse = {
  status: IdTitleName;
  count: number;
}[];

export type GetShopAllOrdersListCountRequest = {
  branchId?: number;
  statuses?: string[];
  supplierUuids?: string;
  supplierTitle?: string;
  buyerFirstName?: string;
  buyerLastName?: string;
  uuid?: string;
  mobileNumber?: string;
  nationalCode?: string;
  createdFrom?: string;
  createdTo?: string;
  totalPriceFrom?: number;
  totalPriceTo?: number;
  itemsCountFrom?: number;
  itemsCountTo?: number;
  quantityFrom?: number;
  quantityTo?: number;
};

export type GetShopAllOrdersListRequest = {
  branchId?: number;
  statuses?: string[];
  supplierUuids?: string[];
  supplierTitle?: string;
  buyerFirstName?: string;
  buyerLastName?: string;
  uuid?: string;
  mobileNumber?: string;
  nationalCode?: string;
  createdFrom?: string;
  createdTo?: string;
  totalPriceFrom?: number;
  totalPriceTo?: number;
  itemsCountFrom?: number;
  itemsCountTo?: number;
  quantityFrom?: number;
  quantityTo?: number;
  pageSize?: number;
  pageNumber?: number;
  sortBy?: string;
  sortDirection?: string;
};

export type GetShopAllOrdersListContentType = {
  uuid: string;
  supplierUuid: string;
  supplierTitle: string;
  buyerFirstName: string;
  buyerLastName: string;
  nationalCode: string;
  mobileNumber: string;
  createdDate: string;
  itemsCount: number;
  quantity: number;
  totalPrice: number;
  status: IdTitleName;
};

export type GetShopAllOrdersListResponse = {
  content: GetShopAllOrdersListContentType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
