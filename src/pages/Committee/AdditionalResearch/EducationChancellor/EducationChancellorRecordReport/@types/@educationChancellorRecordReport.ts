import { SINGLE_VALUE_TYPE } from "../../../../../../infrastructure/models/general.model";
import { BPMS_API_RESPONSE } from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//!GENERAL
export type FormData = {
  reporterNationalcode: string;
  reporterName: string;
  reporterFamily: string;
  reporterNumber: string;
  reporterPhoneNumber: string;
  requestType: string;
  studentName: string;
  studentNumber: string;
  studentFamily: string;
  studentPhoneNumber: string;
  nationalCode: string;
  eventReport: string;
  eventLocation: string;
  datePicker: string;
};
//!API
export type AdditionalResearchSendReportRequest = {
  variables: {
    reporterType: SINGLE_VALUE_TYPE<number>;
    researchAssistantStatus?: SINGLE_VALUE_TYPE<number>;
    educationalAssistantStatus?: SINGLE_VALUE_TYPE<number>;
    studentViceStatus?: SINGLE_VALUE_TYPE<number>;
    reporterNationalcode: SINGLE_VALUE_TYPE<string>;
    Anonymous: SINGLE_VALUE_TYPE<number>;
    reporterName: SINGLE_VALUE_TYPE<string>;
    reporterFamily: SINGLE_VALUE_TYPE<string>;
    reporterNumber: SINGLE_VALUE_TYPE<string>;
    reporterPhoneNumber: SINGLE_VALUE_TYPE<string>;
    requestType: SINGLE_VALUE_TYPE<number>;
    commonReport: SINGLE_VALUE_TYPE<null>;
    studentName: SINGLE_VALUE_TYPE<string>;
    studentNumber: SINGLE_VALUE_TYPE<string>;
    studentFamily: SINGLE_VALUE_TYPE<string>;
    studentPhoneNumber: SINGLE_VALUE_TYPE<string>;
    nationalCode: SINGLE_VALUE_TYPE<string>;
    eventReport: SINGLE_VALUE_TYPE<string>;
    eventLocation: SINGLE_VALUE_TYPE<string>;
    eventDate: SINGLE_VALUE_TYPE<string>;
    userId: SINGLE_VALUE_TYPE<number>;
  };
};
export type AdditionalResearchSendReportResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
