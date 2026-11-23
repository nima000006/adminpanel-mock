import { Tab } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";
//! GENERAL
//! LAYOUT
export type HabitantsDetailsTabsProps = () => Tab[];
//! API

export type GetDormHabitantsPaymentInvoicePaymentStatus = {
  amount: number;
  statusNumber: number;
  trackNumber: number;
  dueDate: string;
  invoiceId: string;
  id: number;
  dormitoryRequestId: number;
  paymentDate: string;
  paymentPlanId: number;
  paymentType: number | string;
};

export type GetDormHabitantsPaymentInvoicePaymentStatusResponse = BPMS_API_RESPONSE<
  GetDormHabitantsPaymentInvoicePaymentStatus[]
>;
