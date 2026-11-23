export type GeyMyBusinessAccountingRefundDetailResponse = {
  service: string;
  buyAmount: {
    amount: number;
    currency: string;
    moneyType: string;
  };
  refundAmount: {
    amount: number;
    currency: string;
    moneyType: string;
  };
  owedAmount: {
    amount: number;
    currency: string;
    moneyType: string;
  };
  totalAmount: {
    amount: number;
    currency: string;
    moneyType: string;
  };
  uuid: string;
  createdDate: string;
  modifiedDate: string;
  refundStatus: string;
  modifiedBy: string;
  firstname: string;
  lastname: string;
  username: string;
  personalCode: string;
  mobileNumber: string;
  degreeName: string;
  fieldName: string;
  branchName: string;
  unitName: string;
  description: string;
  invoiceNumber: string;
  createDateInvoice: string;
  vendorName: string;
};

export type GeyMyBusinessAccountingRefundDetailRequest = {
  uuid: string;
};
