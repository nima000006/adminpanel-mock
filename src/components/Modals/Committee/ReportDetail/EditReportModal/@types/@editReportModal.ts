import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! GENERAL
//! LAYOUT
export type EditReportModalProps = {
  isModalOpen: {
    isOpen: boolean;
    id: number | string;
  };
  closeModalHandler: () => void;
};
//! API
export type getReportAmendmentResponse = BPMS_API_RESPONSE<{
  reporterType: number;
  reporterName: string;
  reporterFamily: string;
  reporterNationalcode: string;
  reporterNumber: string;
  reporterPhoneNumber: string;
  Anonymous: boolean;
  requestType: number;
  commonReport: string;
  studentName: string;
  studentFamily: string;
  nationalCode: string;
  studentNumber: string;
  studentPhoneNumber: string;
  plaintiffType: number;
  eventReport: string;
  eventLocation: string;
  eventDate: string;
}>;
export type getReportAmendmentRequest = {
  _data_: {
    id: string;
  };
};
export type SendReportAmendmentResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type SendReportAmendmentRequest = BPMS_API_REQUEST<
  string,
  {
    reporterType: number;
    reporterNationalcode: string;
    Anonymous: boolean;
    reporterName: string;
    reporterFamily: string;
    reporterNumber: string;
    reporterPhoneNumber: string;
    requestType: number;
    commonReport: string;
    studentName: string;
    studentNumber: string;
    studentFamily: string;
    studentPhoneNumber: string;
    nationalCode: string;
    eventReport: string;
    eventLocation: string;
    eventDate: string;
    userId: number;
    id: number;
  }
>;
