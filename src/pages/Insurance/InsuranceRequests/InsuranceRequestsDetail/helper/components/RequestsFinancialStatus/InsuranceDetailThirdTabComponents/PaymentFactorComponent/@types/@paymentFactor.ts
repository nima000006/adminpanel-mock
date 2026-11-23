//! GENERAL
//! LAYOUT
import {
  FinancialStatusTableDataType,
  InsuranceDataType,
} from "../../../@types/requestsFinancialStatus";

export type PaymentFactorType = {
  insuranceData?: InsuranceDataType;
  paymentType: string | undefined;
  tableData?: FinancialStatusTableDataType[];
};
//! API
