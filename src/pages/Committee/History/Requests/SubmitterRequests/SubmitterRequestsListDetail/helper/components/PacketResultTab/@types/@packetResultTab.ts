import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";
//! GENERAL

//! LAYOUT
export type UserInfoType = {
  respondentOrganization: string;
  inquirerOrganization: string;
  inquirerPost: string;
  inquirerLastName: string;
  respondentLastName: string;
  inquirerDateRequest: string;
  inquirerFirstName: string;
  id: number;
  respondentFirstName: string;
  inquirerNumber: string;
  respondentPost: string;
};
export type TableData = {
  RequestInquiryId: number;
  AssociationFinalRulings_AssociationRulings_title: string;
  AssociationFinalRulings_numberVote: string;
  AssociationFinalRulings_AssociationViolationStudent_AssociationInfractions_title: string;
  AssociationFinalRulings_AssociationViolationStudent_createDate: string;
  AssociationFinalRulings_dateVote: string;
  id: number;
};
export type ResultStatus = "pending" | "rejected" | "success";

//! API
export type GetSubmitterDetailRejectReasonResponse = BPMS_API_RESPONSE<
  {
    id: number;
    reasonRejection: string;
  }[]
>;
