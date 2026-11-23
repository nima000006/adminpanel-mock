import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

import { MainFormDataType } from "../../../../../../../@types/@manualRegistrationResidenceInfoStep";

//! LAYOUTs
export type ManualRegistrationBedAllocationDrawerContentProps = {
  closeDrawerHandler: () => void;
  roomId: number;
  mainFormData: MainFormDataType;
};

export type ManualRegistrationAllocationFormDataType = {
  paymentMethod: string;
  description: string;
};

//!APIs
export type SendManualRegisterByAdminResponse = BPMS_API_RESPONSE<{
  status: number;
  message: string;
}>;

export type SendManualRegisterByAdminRequest = {
  bedId: React.Key;
  deliverPlanId: number;
  residenceEndDate: string;
  residenceStartDate: string;
  username: string;
  paymentByAdmin: boolean;
  descAdmin: string | undefined;
  paymentMethod: number;
};
