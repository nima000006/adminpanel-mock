import { BPMS_API_RESPONSE } from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//!API
export type GetAccusationDetailFirstTabReportData = {
  reporterNumber: string;
  reporterNationalcode: string;
  eventLocation: string;
  eventReport: string;
  reporterPhoneNumber: string;
  id: number;
  reporterName: string;
  reporterFamily: string;
  eventDate: string;
};
export type GetAccusationDetailFirstTabReportResponse = BPMS_API_RESPONSE<
  GetAccusationDetailFirstTabReportData[]
>;
export type MaxResultAndIdType = {
  maxResults: number | string;
  id: number | string;
};
