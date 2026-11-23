import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

//! LAYOUTs
export type BuyersDetailsTransActionListAdvanceFilterFormType = {
  business: SelectType<IdTitleName>[];
  branch: SelectType<IdTitleName>;
  services: SelectType<IdTitleName>;
  userGroup: SelectType<IdTitleName>;
};

//! APIs
export type FinanceTransactionAdvanceFilterDataType = {
  transactionAmount: number;
  transactionAmountType: string;
  paymentType: string;
  paymentWay: string;
  status: string;
  paidInvoiceId: string;
  trackNumber: string;
  beneficiaries: {
    businessName: string;
    branchName: string;
  }[];
  referenceNumber: string;
  serviceName: string;
  province: string;
  city: string;
  businessName: string;
  branchName: string;
  firstName: string;
  lastName: string;
  userName: string;
  personalNumber: string;
  phone: string;
  paymentDate: string;
  id: number;
  isRefunded: boolean;
};

export type GetFinanceTransactionAdvanceFilterListResponse = {
  content: FinanceTransactionAdvanceFilterDataType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetFinanceTransactionAdvanceFilterListRequest = {
  pageable: {
    paged?: boolean;
    pageNumber: number;
    pageSize: number;
    offset?: number;
    sort?: [
      {
        direction: string;
        nullHandling: string;
        ascending: boolean;
        property: string;
        ignoreCase: boolean;
      },
    ];
    unpaged?: boolean;
  };
  from?: string;
  to?: string;
  minAmount?: string;
  username?: string;
  maxAmount?: string;
  status?: string;
  beneficiaryIds?: string;
  serviceNames?: string[];
  isRefunded?: boolean;
};

export type GetFinanceTransactionAdvanceFilter = {
  minAmount?: string;
  maxAmount?: string;
  serviceNames?: string[];
  beneficiaryIds?: string;
};

export enum CustomerGroup {
  STUDENT = "STUDENT",
  EMPLOYEE = "EMPLOYEE",
}

export type GetFinanceBuyersDetailResponse = {
  currency: IdTitleName;
  moneyType: IdTitleName;
  username: string;
  userStaffId: number;
  firstname: string;
  lastname: string;
  personalCode: string;
  phoneNumber: string;
  staffTypes: string;
  services: IdTitleName[];
  allTransactionsAmount: number;
  transactionCounts: number;
  refundedCounts: number;
  allRefundedAmount: number;
  lastTransactionDate: string;
};
