//! APIs
export type ManualPaymentSuccessResponse = {
  data: boolean;
  msg: string;
  status: number;
};

export type ManualPaymentSuccessRequest = {
  requestId: number;
  adminUsername?: string;
  paymentDate: string;
  refrenceNumber: string;
  trackNo: string;
  description: string;
  paymentType: number;
};
