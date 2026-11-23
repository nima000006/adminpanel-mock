import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! GENERAL
//! LAYOUT
export type RequestDetailProps = {
  setViolationId: React.Dispatch<React.SetStateAction<number | null>>;
  confirm: boolean | undefined;
  setConfirm: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};
//! API
export type SubmitterRequest = {
  inquirerOrganization: string;
  inquirerPost: string;
  inquirerLastName: string;
  inquirerFirstName: string;
  AssociationReasoneRequest_title: string;
  AssociationUserRequestType_title: string;
  AssociationInquiryRequestStatus_title: string;
  UniCode: string;
  descRequest: string;
  dateRegistration: string;
  id: number;
  inquirerUnit: string;
  violationId: number;
  confirmation: boolean | undefined;
};
export type GetSubmitterRequestListResponse = BPMS_API_RESPONSE<SubmitterRequest[]>;
export type GetSubmitterRequestListRequest = {
  firstResult: number;
  maxResults: number;
  type: "1,2,3" | "1" | "2" | "3";
  uniCode?: string;
};
