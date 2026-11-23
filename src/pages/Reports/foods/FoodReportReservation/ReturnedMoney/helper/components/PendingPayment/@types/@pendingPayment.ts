import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

export type PendingPaymentAndReturnedMoneyType = {
  id: number;
  title: string;
  amount: number;
  createdDate: string;
  modifiedDate: null;
  description: null;
  referenceNo: null;
  trackNo: null;
  documentFile: null;
  documentUrl: null;
  createdByUserName: string;
  createdByFirstName: null;
  createdByLastName: null;
  createdByPhone: null;
  modifiedByUserName: null;
  modifiedByFirstName: null;
  modifiedByLastName: null;
  modifiedByPhone: null;
  documentStatus: string;
  requestsCount: number;
  totalAmount: number;
  requestDtos: null;
};
export type GetPendingPaymentAndReturnedMoneyListResponse = GENERAL_RESPONSE<{
  documents: PendingPaymentAndReturnedMoneyType[];
  totalElements: number;
  totalPages: number;
}>;
export type GetPendingPaymentAndReturnedMoneyListRequest = {
  statusTab: number;
  pageNo: string;
  pageSize: string;
};
