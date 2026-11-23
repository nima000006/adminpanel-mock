import { GetRequestBankAccountListResponse } from "@pages/Wallet/Requests/BankAccount/BankAccountList/@types/@bankAccountList";

export type ConfirmAllRequestDrawerContentProps = {
  closeDrawerHandler: () => void;
  data: GetRequestBankAccountListResponse | null;
  rowSelection: React.Key[];
  setRowSelection: React.Dispatch<React.SetStateAction<React.Key[]>>;
  refreshList: () => void;
  refreshCount: () => void;
};

// APIS
export type SendAllAcceptedRequest = {
  bankAccountIds: number[];
};
