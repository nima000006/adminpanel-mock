import { ProformaInstallmentItem } from "@pages/Dormitory/UsersRequests/ReservationRequests/ManualReservation/helper/components/ProformaInvoiceStep/helper/components/ProformaInstallmentCard/@types/@proformaInstallmentCard";

export type ProformaPaymentMethod = "full" | "installments";

export type ProformaInvoiceFormType = {
  paymentMethod: ProformaPaymentMethod;
};

export type ProformaUserInfo = {
  firstName: string;
  lastName: string;
  userGroup: string;
  nationalCode: string;
  unit: string;
  phoneNumber: string;
  degree: string;
  major: string;
};

export type ProformaStayInfo = {
  residence: string;
  building: string;
  floor: string;
  unit: string;
  bed: string;
  bedDetails: string;
  admissionProgramTitle: string;
  admissionProgramTag: string;
  stayRangeLabel: string;
};

export type ProformaInvoiceData = {
  user: ProformaUserInfo;
  stay: ProformaStayInfo;
  payableAmount: number;
  /** When greater than zero, the security-deposit summary box is shown. */
  depositAmount: number;
  installments: ProformaInstallmentItem[];
};
