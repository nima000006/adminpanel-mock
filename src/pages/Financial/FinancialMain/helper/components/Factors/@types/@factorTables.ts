import { FinancialPaymentDTOS } from "@infra/models/general.model";
import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

export type GetFactorDescRequest = {
  desc: string;
  documentNo: number;
  ids: React.Key[];
};
export type GetFactorDescResponse = {
  status: number;
  msg: string;
  data: null;
};
export type GetFactorDetailRequest = {
  ids: React.Key[];
};
export type GetFactorDetailResponse = {
  status: number;
  msg: string;
  data: {
    sumAmount: number;
    sumUniversityReceive: number;
    countFactorNo: number;
  };
};
//! GENERAL

//! LAYOUT
export type FactorUserType = {
  key: number;
  firstName: string;
  lastName: string;
  nationalCode: string;
  mobileNo: string;
  unitName: string;
  serviceName: string;
  factorNo: string;
  factorCreateDate: string;
  amount: number;
  universityPercentage: number;
  universityReceive: number;
  paymentStatus: number;
  referenceNo: string;
  documentNumber: null;
};

export type FactorTablesProp = {
  type: number;
};

export type SettlementModalType = {
  isOpen: boolean;
  data: FactorUserType[];
};

//! APIs
//! API
export type GetFinancialListRequest = {
  page: number;
  pageSize: number;
  paymentStatus: number;
};
export type GetFinancialListResponse = {
  status: number;
  msg: string;
  data: {
    totalElement: number;
    totalPage: number;
    last: boolean;
    financialPaymentDtos: FinancialPaymentDTOS[];
  };
};
export type GetAdvanceFilterRequest = {
  beneficiaryBranchCode?: string | null;
  branchCode?: string | null;
  nationalNumber?: string | null;
  pageNumber: number;
  pageSize: number;
  referenceNumber?: string | null;
  serviceName?: string | null;
  trackingNumber?: string | null;
};
export type financeDataList = {
  id: number;
  firstName: string;
  lastName: string;
  nationalCode: string;
  mobileNo: string;
  unitName: string;
  serviceName: null;
  factorNo: string;
  factorCreateDate: null;
  amount: number;
  universityPercentage: number;
  universityReceive: number;
  paymentStatus: number;
  referenceNo: string;
  trackingNo: string;
  userId: number;
  documentNumber: number;
  desc: null;
  providerReceive: number;
  beneficiaryBranchCode: string;
  beneficiaryBranchName: string;
  vendorIBAN: null;
  vendorTitle: null;
  vendorId: null;
  vendorAmount: null;
  vendorPercent: null;
  providerPercent: number;
  universityPercent: number;
  contractId: null;
};
export type GetAdvanceFilterResponse = {
  status: number;
  msg: string;
  data: {
    totalElement: number;
    paymentRequestDtoList: any[];
  };
};

export type GetAdvanceFilterWithDateRequest = {
  beneficiaryBranchCode?: string | null;
  from: string | null;
  pageNumber: number;
  pageSize: number;
  referenceNumber: string | null;
  serviceName: string | null;
  studentBranchCode: string | null;
  to: string | null;
  trackNumber: string | null;
  username: string | null;
  status: string | null;
};
// export type FinancialPaymentDTOS = {};
export type GetAdvanceFilterWithDateResponse = GENERAL_RESPONSE<{
  financialPaymentDtos: FinancialPaymentDTOS[];
  totalPages: number;
  totalElements: number;
}>;

export type downloadGetAllFilteredFinancialUsersExcelBody = {
  beneficiaryBranchCode: string | null;
  from: string | null;
  pageNumber?: number | null;
  pageSize?: number | null;
  referenceNumber: string | null;
  serviceId?: string | null;
  studentBranchCode: string | null;
  to: string | null;
  trackNumber: string | null;
  username: string | null;
};
