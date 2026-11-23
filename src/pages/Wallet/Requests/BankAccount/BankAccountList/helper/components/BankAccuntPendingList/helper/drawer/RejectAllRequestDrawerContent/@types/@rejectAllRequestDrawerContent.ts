import { GetRequestBankAccountListResponse } from "@pages/Wallet/Requests/BankAccount/BankAccountList/@types/@bankAccountList";

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

export type reasonRejectFormType = {
  reasonReject: SelectTypes;
  description: string;
};

export type RejectAllRequestDrawerContentProps = {
  closeDrawerHandler: () => void;
  data: GetRequestBankAccountListResponse | null;
  rowSelection: React.Key[];
  setRowSelection: React.Dispatch<React.SetStateAction<React.Key[]>>;
  refreshList: () => void;
  refreshCount: () => void;
};

// APIS
export type RejectReasonSelectList = {
  id: number;
  name: string;
  title: string;
};
export type GetRejectReasonSelectListResponse = RejectReasonSelectList[];
