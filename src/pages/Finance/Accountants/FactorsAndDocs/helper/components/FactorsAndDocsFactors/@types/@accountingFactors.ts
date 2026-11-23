import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type AccountingFactorsContent = {
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
export type AccountingGetAccountingFactorsResponse = {
  content: AccountingFactorsContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
export type AccountingGetAccountingFactorsRequest = {
  pageNumber: number;
  pageSize: number;
  from?: string;
  to?: string;
  uuid?: string;
  samimServices?: string;
  invoiceStatus?: string;
  supplierBranchIds?: string;
  supplierBusinessIds?: string;
  supplierCityIds?: string;
  supplierProvinceIds?: string;
  consumerBranchIds?: string;
  consumerBusinessIds?: string;
  consumerCityIds?: string;
  consumerProvinceIds?: string;
  sortBy?: string;
  sortDirection?: string;
};

export type FactorAndDocsFormType = {
  province: SelectType<IdTitleName>[];
  city: SelectType<IdTitleName>[];
  business: SelectType<IdTitleName>[];
  provinceBuyer: SelectType<IdTitleName>[];
  cityBuyer: SelectType<IdTitleName>[];
  businessBuyer: SelectType<IdTitleName>[];
  branchBuyer: SelectType<IdTitleName>[];
  saminService: SelectType<IdTitleName>[];
  branch: SelectType<IdTitleName>[];
};
