import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type getDocumentsDetailsResponse = {
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

export type factorsAndDocsDocumentDrawerContentProps = {
  closeDrawerHandler: () => void;
  id: string | undefined;
};
