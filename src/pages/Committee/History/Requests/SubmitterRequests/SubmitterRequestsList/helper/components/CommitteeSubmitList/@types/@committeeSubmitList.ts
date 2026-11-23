import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! GENERAL

//! LAYOUT
export type TableType = { tableType: "1,2,3" | "1" | "2" | "3" };
export type CommitteeSubmitListDataSource = {
  AssociationInquiryRequestStatus_title: string;
  reasonRequest: string;
  UniCode: string;
  inquirerNationalCode: string;
  dateRegistration: string;
  studentNumberOffender: string;
  AssociationInquiryRequestStatus_id: 1 | 2 | 3;
  nationalCodeOffender: string;
  id: number;
};
//! API
export type GetSubmitterHistoryRequestListResponse = BPMS_API_RESPONSE<
  {
    AssociationInquiryRequestStatus_title: string;
    reasonRequest: string;
    UniCode: string;
    inquirerNationalCode: string;
    dateRegistration: string;
    studentNumberOffender: string;
    AssociationInquiryRequestStatus_id: 1 | 2 | 3;
    nationalCodeOffender: string;
    id: number;
    AssociationReasoneRequest_title: string;
    status: number;
  }[]
>;
export type GetSubmitterHistoryRequestListRequest = {
  firstResult: number;
  maxResults: number;
  type: "1,2,3" | "1" | "2" | "3";
  nationalCode?: string;
};
