import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type BusinessItem = {
  id: number;
  title: string;
};

export type AccountingGetAllBusinessResponse = {
  content: BusinessItem[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type BranchItem = {
  id: number;
  title: string;
};

export type AccountingGetBranchResponse = {
  content: BranchItem[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type AccountingGetAllFactorsDetailsResponse = {
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
  supplierFullName: string;
  supplierNationalCode: string;
  supplierEconomicCode: string;
  supplierAddress: string;
  supplierTelephone: string;
  supplierPostalCode: string;
  supplierPersonalityType: IdTitleName;
  customerFullName: string;
  customerNationalCode: string;
  customerEconomicCode: string;
  customerAddress: string;
  customerTelephone: string;
  customerPostalCode: string;
  customerPersonalityType: IdTitleName;
  customerBranchId: number;
  customerBusinessId: number;
  customerBusinessName: string;
  customerBranchName: string;
  customerBeneficiaryId: number;
  customerProvinceName: string;
  customerCityName: string;
  customerProvinceId: number;
  customerCityId: number;
};

type IdName = {
  id: number;
  name: string;
};

export type getBusinessAccountingResponseItems = IdName;
export type getBusinessAccountingResponse = getBusinessAccountingResponseItems[];

type getBranchAccountingResponseItems = IdName;

export type getBranchAccountingResponse = getBranchAccountingResponseItems[];

export type GetSettlementBusinessIdsResponse = IdName[];

export type GetSettlementBranchesResponse = IdName[];
