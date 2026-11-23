import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";
//! GENERAL
//! LAYOUT
export type DataDrawerProps = {
  title: string;
  onClose: () => void;
  id: number;
};
//! API
export type GetPaymentDetailsDrawerDataResponse = GENERAL_RESPONSE<{
  price: string;
  settlementDate: string;
  dueDate: string;
  penalty: string;
  paymentMethod: string;
  portId: string;
  issueTracking: string;
  factorNum: string;
}>;
