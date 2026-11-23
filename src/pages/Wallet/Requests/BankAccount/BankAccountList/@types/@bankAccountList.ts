import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

type SelectTypes = {
  label: string;
  value: string;
  key: number;
  code: number;
  children: string;
  item: {
    id: number;
    title: string;
  };
};
export type WalletRequestUser = {
  id: number;
  status: number;
  dayCounter: string;
  requestNumber: string;
  businessName: string;
  businessType: string;
  province: string;
  city: string;
  branch: string;
  dataAndTimeRequest: string;
  branchCode: string;
  service: string;
  businessManager: string;
  mobileManager: string;
  responsibleFollowingRequest?: string;
  requestStatus?: number;
  requestAmount?: number;
  firstName?: string;
  lastName?: string;
};

export type GetBankAccountListCountResponse = {
  requested: number;
  rejected: number;
  accepted: number;
  total: number;
};

export type RequestBankAccountDataType = {
  id: number;
  iban: string;
  isDefault: boolean;
  cardNumber: string;
  bankId: number;
  bankName: string;
  status: string;
  createdDate: string;
  modifiedDate: string;
  branchName: string;
  branchCode: number;
  businessName: string;
  regionTitle: string;
  createdBy: {
    username: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
  };
  province: string;
  city: string;
  services: IdTitleName[];
  personalityGroupType: IdTitleName;
};
export type GetRequestBankAccountListResponse = {
  content: RequestBankAccountDataType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type RequestBankAccountListAdvanceFilterItemsType = {
  iban?: string;
  cardNumber?: string;
  branchId?: number;
  bankName?: string;
  samimService?: string;
  businessId?: number;
};
export type GetRequestBankAccountListAdvanceFilterRequest = {
  pageNumber: number;
  pageSize: number;
  iban?: string;
  cardNumber?: string;
  branchId?: string;
  bankName?: string;
  samimService?: string;
  businessId?: string;
  status?: string;
};

export type BankAccountAdvanceFilterFormType = {
  iban: string;
  cardNumber: string;
  businessId?: string;
  branchId: SelectTypes;
  serviceName: SelectTypes[];
  status: SelectTypes[];
};
