import { FormInstance } from "antd";

import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

import { ManualRegistrationAllocationFormDataType } from "../../../../@types/@manualRegistrationBedAllocationDrawerContent";

//! LAYOUTs
export type ManualRegistrationConfirmBedAllocationModalContentProps = {
  form: FormInstance<ManualRegistrationAllocationFormDataType>;
  admissionId: number;
};

//! APIs
export type ReceivePaymentType = {
  tenant_id: null;
  deliverPlanId: number;
  paymentTypeId: number;
  AssociationPaymentType_title: string;
  id: number;
};

export type GetReceivePaymentTypeResponse = BPMS_API_RESPONSE<ReceivePaymentType[]>;
