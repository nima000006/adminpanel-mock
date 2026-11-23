import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type MyInvoicesAndDocsServiceDataType = {
  statusDocuments: number;
  id: string;
  amount: number;
  branch: string;
  service: string;
  city: string;
  province: string;
  createAt: string;
};
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
export type MyInvoicesAndDocsServiceDocumentsAdvanceFilterFormType = {
  service: SelectTypes[];
};

export type GetMyAccountantBranchDocumentsDetailsResponse = {
  uuid: string;
  accountingInvoiceId: string;
  settlementAggregationStatus: IdTitleName;
  accountingInvoiceSettleStatus: IdTitleName;
  amount: number;
  createdDateTime: string;
  businessName: string;
  branchName: string;
  beneficiaryName: string;
  serviceName: string;
  samimService: IdTitleName;
  description: string;
  documentType: IdTitleName;
  documentReason: IdTitleName;
};

export type GetMyAccountantBusinessDocumentsDetailsResponse = {
  uuid: string;
  accountingInvoiceId: string;
  settlementAggregationStatus: IdTitleName;
  accountingInvoiceSettleStatus: IdTitleName;
  amount: number;
  createdDateTime: string;
  businessName: string;
  branchName: string;
  beneficiaryName: string;
  serviceName: string;
  samimService: IdTitleName;
  description: string;
  documentType: IdTitleName;
  documentReason: IdTitleName;
};
