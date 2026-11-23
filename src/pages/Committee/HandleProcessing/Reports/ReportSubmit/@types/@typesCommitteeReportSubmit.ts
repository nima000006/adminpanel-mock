import { BPMS_API_RESPONSE } from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//!LAYOUT
export type AccusedDataType = {
  name: string;
  family: string;
  nationalCode: string;
  mobileNumber: string;
  accusedStudentNumber: string;
  id: string;
  key: string;
};
export type FormDataType = {
  reporterType: string;
  reporterName: string;
  reporterFamily: string;
  reporterNumber: string;
  reporterNationalcode: string;
  reporterPhoneNumber: string;
  reportType: string;
  commonReport: string;
  report: string;
  requestType: string;

  accusedName: string;
  studentFamily: string;
  accusedNationalNumber: string;
  accusedStudentNumber: string;
  studentPhoneNumber: string;
  studentName: string;
  studentNumber: string;
  nationalCode: string;
  eventReport: string;
  datePicker: string;
  reportDesc: string;
  eventLocation: string;
  image: {
    file: {
      uid: string;
      lastModified: number;
      lastModifiedDate: string;
      name: string;
      size: number;
      type: string;
      percent: number;
      originFileObj: {
        uid: string;
      };
      error: {
        status: number;
        method: string;
        url: string;
      };
      response: string;
      status: string;
      thumbUrl: string;
    };
    fileList: [
      {
        uid: string;
        lastModified: number;
        lastModifiedDate: string;
        name: string;
        size: number;
        type: string;
        percent: number;
        originFileObj: {
          uid: string;
        };
        error: {
          status: number;
          method: string;
          url: string;
        };
        response: string;
        status: string;
        thumbUrl: string;
      },
    ];
  };
};
//! API
export type SendCommitteeReportResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type SendCommitteeReportRequest = {
  variables: {
    reporterType: {
      value: number;
    };
    reporterNationalcode: {
      value: string;
    };
    Anonymous: {
      value: number;
    };
    reporterName: {
      value: string;
    };
    reporterFamily: {
      value: string;
    };
    reporterNumber: {
      value: string;
    };
    reporterPhoneNumber: {
      value: string;
    };
    requestType: {
      value: number;
    };
    commonReport: {
      value: string;
    };
    studentName: {
      value: string;
    };
    studentNumber: {
      value: string;
    };
    studentFamily: {
      value: string;
    };
    studentPhoneNumber: {
      value: string;
    };
    nationalCode: {
      value: string;
    };
    eventReport: {
      value: string;
    };
    eventLocation: {
      value: string;
    };
    eventDate: {
      value: string;
    };
    userId: {
      value: number;
    };
    securityStatus?: {
      value: number;
    };
  };
};
export type GetTypePlaintiffResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: string;
  }[]
>;
