export enum DocumentTypeEnum {
  REFUND = "REFUND",
  PARTNERSHIP_COMMISSION = "PARTNERSHIP_COMMISSION",
  SALES_INVOICE = "SALES_INVOICE",
  PAYMENT_VOUCHER = "PAYMENT_VOUCHER",
}

export const DocumentTypeList = [
  DocumentTypeEnum.PARTNERSHIP_COMMISSION,
  DocumentTypeEnum.REFUND,
  DocumentTypeEnum.SALES_INVOICE,
];
