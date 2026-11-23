import { GetBankTransactionListsItems } from "@pages/Wallet/Transactions/BankTransactions/@types/@bankTransactions";

type staffType = "STUDENT" | "EMPLOYEE" | "DEFAULT";

export type IdTitleName<TName = string> = {
  id: number;
  title: string;
  name: TName;
};

export type BankMoreDetailDrawerContentProps = {
  closeDrawerHandler: () => void;
  transaction: GetBankTransactionListsItems;
  setIsResolveConflict: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      id: number;
    }>
  >;
};

export type GetBankTransactionDetailsRequest = {
  id: number;
};
export type GetBankTransactionDetailsResponse = {
  staffType: IdTitleName<staffType>;
  transactionDetailResponseDto: {
    amount: number;
    topic: IdTitleName;
    createdDateTime: string;
    trackNumber: string;
    referenceNumber: string;
    service: IdTitleName;
    bank: IdTitleName;
    status: IdTitleName;
    successful: boolean;
    gateway: string;
  };
  student: {
    firstname: string;
    lastname: string;
    nationalCode: string;
    studentNumber: string;
    mobileNumber: string;
    studyField: string;
    degree: string;
    branchName: string;
  };
  employee: {
    firstname: string;
    lastname: string;
    nationalCode: string;
    employeeCode: string;
    mobileNumber: string;
    position: string;
    branchName: string;
  };
};

export type transactionInquiryResponse = {
  status: IdTitleName;
  amount: number;
  cardNo: string;
  retrievalRefNo: string;
  responseCode: string;
  transactionDateTime: string;
  message: null | string;
  orderId: number;
  systemTraceNo: string;
};
