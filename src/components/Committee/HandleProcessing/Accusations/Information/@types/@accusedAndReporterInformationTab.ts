import { BPMS_API_RESPONSE } from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";
//! LAYOUT
export type ReporterInfoPropsType = {
  nationalCode: string;
  reporterNumber: string;
  studentNumber: string;
  reporterNationalcode: string;
  studentName: string;
  studentPhoneNumber: string;
  reporterPhoneNumber: string;
  id: number;
  reporterName: string;
  reporterFamily: string;
  studentFamily: string;
};
export type StudentInfoPropsType = {
  nationalCode: string;
  reporterNumber: string;
  studentNumber: string;
  reporterNationalcode: string;
  studentName: string;
  studentPhoneNumber: string;
  reporterPhoneNumber: string;
  id: number;
  reporterName: string;
  reporterFamily: string;
  studentFamily: string;
};
//! Api
export type GetInfoInvestigationChargesResponse = BPMS_API_RESPONSE<
  {
    nationalCode: string;
    reporterNumber: string;
    studentNumber: string;
    reporterNationalcode: string;
    studentName: string;
    studentPhoneNumber: string;
    reporterPhoneNumber: string;
    id: number;
    reporterName: string;
    reporterFamily: string;
    studentFamily: string;
  }[]
>;
