import { FormInstance } from "antd";

import { RoomActiveUserType } from "@pages/Room/Requests/ActiveRequests/@types/@roomActiveRequests";

//! GENERAL
export type ChangeToPaidModalContentForm = {
  paymentReferenceNumber: string;
  paymentTransactionNumber: string;
  description: string;
  paymentDate: string;
  paymentType: string;
};

//! LAYOUT
export type ChangeToPaidModalContentProps = {
  changeToPaidModal: Partial<RoomActiveUserType>;
  form: FormInstance<ChangeToPaidModalContentForm>;
};

export type RoomPaymentSelectType = "1" | "2" | "3" | "4";
