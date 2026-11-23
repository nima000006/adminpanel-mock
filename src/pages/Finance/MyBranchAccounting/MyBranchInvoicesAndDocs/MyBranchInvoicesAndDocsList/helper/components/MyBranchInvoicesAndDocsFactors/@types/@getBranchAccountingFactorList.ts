import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type GetBranchAccountingFactorListItems = {
  uuid: string;
  paymentPlanId: number;
  invoiceUuid: string;
  createdDate: string;
  invoiceStatus: IdTitleName;
  isSupplier: boolean;
  product: IdTitleName;
  service: IdTitleName;
  paymentType: IdTitleName;
  trackNumber: string;
  referenceNumber: string;
  paymentDate: string;
  invoiceAmount: number;
  currency: IdTitleName;
  moneyType: IdTitleName;
  supplierBranchId: number;
  supplierBusinessId: number;
  supplierBusinessName: string;
  supplierBranchName: string;
  supplierBeneficiaryId: number;
  supplierProvinceName: string;
  supplierCityName: string;
  supplierProvinceId: number;
  supplierCityId: number;
};
export type GetBranchAccountingFactorListResponse = {
  content: GetBranchAccountingFactorListItems[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
export type GetBranchAccountingFactorListRequest = {
  pageNumber: number;
  pageSize: number;
  from?: string;
  to?: string;
  samimService?: string;
  invoiceStatus?: string;
  uuid?: string;
  sortBy?: string;
  sortDirection?: string;
};
