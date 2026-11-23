export type GetRefundRequestDetailResponse = {
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
  totalAmount: {
    amount: number;
    currency: string;
    moneyType: string;
  };
  invoiceNumber: string;
  createDateInvoice: string;
  vendorName: string;
};

export type SendSingleRejectAndConfirmRefundRequest = {
  id: string | undefined;
  params: {
    status: string;
    rejectReason?: string;
  };
};
