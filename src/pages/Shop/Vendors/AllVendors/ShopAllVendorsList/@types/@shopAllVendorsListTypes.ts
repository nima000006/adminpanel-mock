export type ShopAllVendorsListRecordType = {
  uuid: string;
  title: string;
  bookCount: number;
  openOrderCount: number;
  closedOrderCount: number;
};

//! APIs
export type GetAllVendorsListRequest = {
  pageSize: number;
  pageNumber: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC" | string;
  title?: string;
  branchId?: number;
  businessId?: number;
  bookCountFrom?: number;
  bookCountTo?: number;
  openOrderCountFrom?: number;
  openOrderCountTo?: number;
  closedOrderCountFrom?: number;
  closedOrderCountTo?: number;
};

export type GetAllVendorsListResponse = {
  content: ShopAllVendorsListRecordType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
