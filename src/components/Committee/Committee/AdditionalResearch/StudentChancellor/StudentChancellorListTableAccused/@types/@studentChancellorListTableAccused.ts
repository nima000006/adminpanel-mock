import { BPMS_API_RESPONSE } from "../../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//!API
export type GetAdditionalStudentListData = {
  studentName: string;
  studentFamily: string;
  studentNumber: string;
  charge: boolean | null;
  eventReport: string;
  id: number;
  dateLastStatusChange: string;
  createDate: string;
  AssociationRequestType_title: string;
  AssociationSecondReferral_nameReferencedUnit: string;
  userId: number;
  reporterName: string;
  reporterFamily: string;
  reporterUni: string;
};

export type GetAdditionalStudentListResponse = BPMS_API_RESPONSE<
  GetAdditionalStudentListData[]
>;

export type GetAdditionalStudentListRequest = {
  firstResult: number;
  maxResults: number;
  type: 1 | 2 | 3 | 4 | 5 | 6 | "1,2,3,4,5,6";
};
