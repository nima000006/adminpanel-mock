import { JSX } from "react";

import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type statisticsDataTypes = {
  title: string;
  count: number;
  currency?: string;
};

export type TransactionListDataTypes = {
  id: number;
  transactionAmount: number;
  paymentType: string;
  paymentMethod: string;
  status: string;
  gatewayInvoiceNumber: string;
  studentInvoiceNumber: string;
};

export type StatusItemType = {
  text: string;
  icon: JSX.Element;
  color: "red" | "blue" | "warning" | "processing" | "success" | "purple";
};

export type InputDataType = { label: string; value: string };
export type TimelineItem = {
  date: string;
  text: string;
  user: string;
  status?: "success" | "error" | "warning" | "default";
};
export type HistoryModalProps = { isOpen: boolean; onClose: () => void };
export type FilterModalProps = {
  isOpen: boolean;
  setOpen: (state: { isOpen: boolean; id: number }) => void;
};

export type TransactionBeneficiariesItem = {
  id: number;
  businessId: number;
  businessName: string;
  branchId: number;
  branchName: string;
  beneficiaryAmount: number;
  beneficiaryPercentage: number;
};

export type GetTransactionDetailResponse = {
  uuid: string;
  transactionAmount: number;
  currency: IdTitleName;
  transactionDate: string;
  samimService: IdTitleName;
  beneficiaryCount: number;
  beneficiaries: TransactionBeneficiariesItem[];
  customerUserStaffId: number;
  customerFullName: string;
  customerFirstname: string;
  customerLastname: string;
  customerPersonalCode: string;
  customerPhoneNumber: string;
  customerDegreeName: string;
  customerFieldName: string;
  customerBranchId: number;
  customerBranchName: string;
  customerBusinessId: number;
  customerBusinessName: string;
  customerUsername: string;
};

export type FinanceTransactionFormType = {
  province: SelectType<IdTitleName>[];
  city: SelectType<IdTitleName>[];
  business: SelectType<IdTitleName>[];
  branch: SelectType<IdTitleName>[];
  serviceName: SelectType<IdTitleName>[];
};
