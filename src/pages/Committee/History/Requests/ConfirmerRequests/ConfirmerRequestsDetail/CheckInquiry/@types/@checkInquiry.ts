import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! GENERAL
//! LAYOUT
export type formValues = {
  firstName: string;
  lastName: string;
  mobileNo: string;
  nationalNo: string;
  pageNumber: number;
  pageSize: number;
  studentNo: string;
};

export type rejectFormData = {
  rejectReportDescription: string;
  rejectReportReason: {
    children: string;
  };
};
//! API
export type GetConfirmerDetailCheckInquiryResponse = BPMS_API_RESPONSE<{
  inquirerFirstName: string;
  signatoryLastName: string;
  nationalCodeOffender: string;
  respondentLastName: string;
  descRequest: string;
  inquirerDateRequest: string;
  dateRegistration: string;
  id: number;
  studentNumberOffender: string;
  reasonRejection: string;
  respondentOrganization: string;
  dateFinalAnswer: string;
  reasonRequest: 3;
  inquirerOrganization: string;
  inquirerPost: string;
  inquirerLastName: string;
  AssociationInquiryRequestStatus: {
    id: number;
    title: string;
  };
  AssociationTypeInformation: {
    id: number;
    title: string;
  };
  AssociationReasoneRequest: {
    id: number;
    title: string;
  };
  signatoryPost: string;
  respondentFirstName: string;
  nameOffender: string;
  familyOffender: string;
  inquirerNumber: string;
  respondentPost: string;
  signatoryFirstName: string;
  signatoryOrganization: string;
  inquirerNationalCode: string;
  descRejection: string;
  typeInformation: 2;
  status: 1;
}>;
export type GetConfirmerDetailCheckInquiryRequest = {
  _data_: {
    id: string;
  };
};
export type GetReasonRejectingInquiryRequestResponse = BPMS_API_RESPONSE<
  { id: number; title: string }[]
>;
export type SendConfirmerDetailCheckInquiryResponse = BPMS_API_RESPONSE<{ id: number }>;
export type SendConfirmerDetailCheckInquiryRequest = BPMS_API_REQUEST<
  string,
  {
    dateRejection: string;
    descRejection: string;
    id: number;
    reasonRejection: string;
    status: 2;
  }
>;
