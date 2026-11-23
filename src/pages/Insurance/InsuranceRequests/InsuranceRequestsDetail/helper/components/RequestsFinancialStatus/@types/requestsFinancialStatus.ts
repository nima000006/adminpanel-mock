import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";
//! GENERAL
//! LAYOUT
//! API
export type PaymentTypeStepsDataType = {
  id?: number;
  amount?: string;
  dueDate?: string;
  lateFees?: null | string;
  status?: string;
  paymentStatus?: string;
  title?: null | string;
  settlementDate?: null | string;
};
export type GeneralInstallmentInfoType = {
  totalPrice: string;
  countInstallment: string;
  remainingAmount: string;
  remainingInstallments: string;
  installmentsPaid: string;
  amountPaid: string;
  amountOwed: string;
};
export type InsuranceDataType = {
  insurer: string;
  typeInsurance: string;
  dateCreateFactor: string;
  factorNum: string;
  insured: number;
};
export type FinancialStatusTableDataType = {
  id: number;
  name: string;
  family: string;
  gender: string;
  age: string;
  price: string;
  selectInsurancePlan: string;
};

export type PaymentCashType = {
  id: number;
  title: string;
  amount: string;
  settlementDate: string;
};

export type GetFinancialStatusResponse = GENERAL_RESPONSE<{
  insuranceData: InsuranceDataType;
  tableData: FinancialStatusTableDataType[];
  generalInstallmentInfoTabFourAdminDto: GeneralInstallmentInfoType;
  paymentType: string;
  paymentTypeStepsData: PaymentTypeStepsDataType[];
  paymentTypeCash: PaymentCashType;
}>;
