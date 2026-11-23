import { SHOP_VENDOR_ORDER_STATUS } from "@pages/Shop/Vendors/_shared/utils";

export type ShopAllVendorsDetailOrdersAdvanceFilterFormType = {
  date: [string, string];
};

export type ShopVendorOrderStatus =
  (typeof SHOP_VENDOR_ORDER_STATUS)[keyof typeof SHOP_VENDOR_ORDER_STATUS];

export type ShopVendorOrderStatusItem = {
  id: ShopVendorOrderStatus | number;
  name?: string;
  title?: string;
  count?: number;
};

export type ShopAllVendorsDetailOrdersRecordType = {
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
  status: ShopVendorOrderStatusItem;
};

//! APIs
export type GetCountOrdersRequest = {
  branchId?: number;
  statuses?: string[];
  supplierUuids: string[];
  supplierTitle?: string;
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

export type GetCountOrdersResponse = {
  status: {
    id: number;
    name: string;
    title: string;
  };
  count: number;
}[];

export type GetVendorOrdersListRequest = {
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
  pageSize: number;
  pageNumber: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC" | string;
};

export type GetVendorOrdersListResponse = {
  content: ShopAllVendorsDetailOrdersRecordType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
