//! GENERAL

import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

//! LAYOUT
export type PaymentStatus =
  | "pendingPayment"
  | "issuing"
  | "issued"
  | "suspended"
  | "canceled"
  | "expired";

export type DataSource = {
  insuranceType: string;
  totalPrice: string;
  insuredQty: string;
  requestNumber: string;
  insurer: string;
  paymentType: string;
  installmentsQty: string;
  insuranceNumber: string;
  paymentStatus: PaymentStatus;
  invoiceIssuanceDate: string;
  registrationDate: string;
  paymentDate: string;
  issuanceDate: string;
  startDate: string;
  expiredDate: string;
  suspendedDate: string;
  canceledDate: string;
  insurancePlans: {
    img: string;
    title: string;
    role: string;
    period: string;
    price: string;
    status: string;
    id: string;
  }[];
  id: string;
};

//! API

export type InsuranceInformationDetailsWithInsuredIdDataType = {
  id: string;
  insuranceType: string;
  totalPrice: number;
  requestNumber: string;
  insurer: string;
  paymentType: number;
  installmentsQty: string;
  insuranceNumber: string;
  paymentStatus: string;
  registrationDate: string;
  invoiceIssuanceDate: string;
  paymentDate: string;
  issuanceDate: string;
  startDate: string;
  suspendedDate: string;
  expiredDate: string;
  canceledDate: string;
  insuredQty: string;
  insurancePlansDetailForAdminDtoList: {
    img: string;
    title: string;
    role: number;
    period: string;
    price: number;
    status: string;
    id: number;
  }[];
};

export type GetInsuranceInformationDetailsWithInsuredIdResponse =
  GENERAL_RESPONSE<InsuranceInformationDetailsWithInsuredIdDataType>;
