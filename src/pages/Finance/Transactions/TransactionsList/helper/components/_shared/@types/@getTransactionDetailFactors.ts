import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type GetTransactionDetailFactors = {
  uuid: string;
  invoiceUuid: string;
  businessId: number;
  businessName: string;
  branchId: number;
  branchName: string;
  amount: number;
  currency: string;
  accountingInvoiceType: IdTitleName;
};

export type GetTransactionDetailFactorsResponse = GetTransactionDetailFactors[];
