import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type UseBankTransactionAdvanceFilterFormType = {
  branch: SelectType<IdTitle>[];
  groups: SelectType<IdTitle>;
  status: SelectType<IdTitle>;
  aimTransaction: SelectType<IdTitle>;
  methodPayment: SelectType<IdTitle>;
  date: string[];
};

export type statusType = "SUCCESS" | "UNSUCCESS";
export type aimTransactionType = "FACILITIES" | "RENEW";
export type typeGroups = "STUDENT" | "STAFF";

export type GetBankTransactionListsRequest = {
  branchIds?: string;
  staffType?: string;
  status?: string;
  samimService?: string;
  gateWayPayment?: string;
  fromDate?: string;
  toDate?: string;
  fromAmount?: number;
  toAmount?: number;
  pageNumber: number;
  pageSize: number;
  sortBy?: string;
  sortDirection?: string;
};

type idTitleName = {
  id: number;
  name: string;
  title: string;
};

export type GetBankTransactionListsItems = {
  paymentRequestId: number;
  staffType: idTitleName;
  firstName: string;
  lastName: string;
  nationalCode: string;
  personalCode: string;
  branchName: string;
  branchId: number;
  userStaffId: number;
  userId: number;
  amount: number;
  service: idTitleName;
  bankGateway: idTitleName;
  referenceNumber: string;
  trackNumber: string;
  paymentDate: string;
  status: IdTitleName;
};

export type GetBankTransactionListsResponse = {
  content: GetBankTransactionListsItems[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
