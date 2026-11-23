import { FormInstance } from "antd";

import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! LAYOUT
type SelectType = {
  key: string;
  value: string;
  children: string;
  name: string;
  code: number;
  item: { id: number; title: string };
};

export type RequestSendingAdmissionFormData = FormInstance<{
  residence: SelectType;
  unitsPresent: SelectType[];
  applicationLevel: number[][];
  title: string;
  managementType: SelectType;
  uni: SelectType;
  timingType: SelectType;
  months: string;
  reservationType: SelectType;
  paymentType: SelectType[];
  paymentMethod: SelectType[];
  userGroup: SelectType[];
  educationDegree: SelectType[];
  nationality: SelectType[];
  specialConditions: SelectType[];
  applyingForAnother: SelectType;
  canDebt: SelectType;
  maxDebt: number;
  installmentMaxNumber: string;
  description: string;
  startDateApplied: string;
  startDateReservation: string;
  startDateDelivery: string;
  startDateExtension: string;
  startTimeApplied: string;
  startTimeReservation: string;
  startTimeDelivery: string;
  startTimeExtension: string;
  endDateApplied: string;
  endDateReservation: string;
  endDateDelivery: string;
  endDateExtension: string;
  endTimeApplied: string;
  endTimeReservation: string;
  endTimeDelivery: string;
  endTimeExtension: string;
  discountPercent: number;
  constDiscount: number;
  installmentsNumber: SelectType;
  latePenaltyPercent: number;
  constPenaltyPercent: number;
}>;

export type WorkSpacesAdmissionStepProps = {
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  form: FormInstance;
  data: (id: string) => void;
  loading: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

//! API
export type GetAdmissionTaskIdResponse = BPMS_API_RESPONSE<{ id: string }[]>;
export type GetAdmissionTaskIdRequest = {
  processVariables: [{ name: string; operator: string; value: number }];
};
