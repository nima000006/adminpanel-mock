import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

export type GetPersonReturnMoneyDetailType = {
  id: number;
  title: string;
  amount: number;
  createdDate: string;
  paymentDate: string;
  modifiedDate: string;
  description: string;
  referenceNo: string;
  trackNo: number;
  documentFile: null;
  documentUrl: null;
  createdByUserName: string;
  createdByFirstName: null;
  createdByLastName: null;
  createdByPhone: null;
  modifiedByUserName: string;
  modifiedByFirstName: null;
  modifiedByLastName: null;
  modifiedByPhone: null;
  documentStatus: string;
  requestsCount: number;
  totalAmount: number;
  requestDtos: null;
  fromBankPersianName: string;
  fromIBAN: string;
};
export type GetPersonReturnMoneyDetailResponse =
  GENERAL_RESPONSE<GetPersonReturnMoneyDetailType>;
