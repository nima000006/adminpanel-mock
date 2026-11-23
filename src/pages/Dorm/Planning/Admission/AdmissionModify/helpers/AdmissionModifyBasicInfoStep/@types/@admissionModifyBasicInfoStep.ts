import { FormInstance } from "antd";

import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

import { AdmissionModifyFormData } from "../../../@types/@admissionModify";

//!LAYOUT
export type AdmissionModifyTimingInfoTableData = {
  title: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  id: number;
  stringId: string;
  isDisabled: boolean;
};

export type AdmissionModifyBasicInfoStepProps = {
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  form: FormInstance<AdmissionModifyFormData>;
  loading: boolean;
  id?: string;
  setIsMonthly?: React.Dispatch<React.SetStateAction<boolean>>;
  isMonthly?: boolean | undefined;
  setIsSemester?: React.Dispatch<React.SetStateAction<boolean>>;
  isSemester?: boolean | undefined;
  canDebt?: string | undefined;
  isApplicationReviewDeadlineShow: boolean;
  setIsApplicationReviewDeadlineShow: React.Dispatch<React.SetStateAction<boolean>>;
};
//! API
export type GetPaymentDeadlineResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: number;
  }[]
>;
export type GetApplicationReviewDeadlineResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: number;
  }[]
>;

export type GetAbilityDisableDeliveryPlanResponse = BPMS_API_RESPONSE<
  {
    tenant_id: number | null;
    deliverPlanId: number;
    cancellationRequestStatus: string | null;
    statusId: number;
    residenceEndDate: string;
    id: number;
  }[]
>;
