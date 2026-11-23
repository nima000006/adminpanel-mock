import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

// LAYOUT
export type FoodPendingPaymentDetailDrawerContentProps = {
  closeDrawerHandler: () => void;
  loading: boolean;
  total: number | undefined;
  dataSourceDetail: requestDtos[];
  id: number;
  detailData: (id: number) => void;
  paymentDate: string;
};

// API
export type requestDtos = {
  id: number;
  basketUserName: string;
  basketFirstName: string;
  basketLastName: string;
  basketStudentNumber: string;
  status: number;
  cardNumber: string;
  bankName: string;
  bankAccountOwner: null;
  basketPlansQuantity: number;
  basketPlansPlanBasePrice: number;
  basketPlansPlanTotalAmount: null;
  basketPlansPlanReserveDate: string;
  iban: string;
};
export type GetPendingPaymentDetailType = {
  id: number;
  title: string;
  amount: number;
  createdDate: string;
  modifiedDate: string;
  description: string;
  referenceNo: number;
  trackNo: number;
  documentFile: null;
  documentUrl: string;
  createdByUserName: string;
  createdByFirstName: string;
  createdByLastName: string;
  createdByPhone: null;
  modifiedByUserName: string;
  modifiedByFirstName: string;
  modifiedByLastName: string;
  modifiedByPhone: null;
  documentStatus: string;
  requestsCount: number;
  totalAmount: number;
  requestDtos: requestDtos[];
  paymentDate: string;
  fromIBAN: string;
  fromBankPersianName: string;
};
export type GetPendingPaymentDetailResponse = {
  status: 200;
  msg: "با موفقیت انجام شد";
  data: GetPendingPaymentDetailType;
  errors: null;
};

export type SendRemovePendingPaymentItemResponse = GENERAL_RESPONSE<number>;
export type SendRemovePendingPaymentItemRequest = {
  documentId: number;
  removedRequestIds: number[];
};
