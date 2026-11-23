import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! API
export type sendCommitteeRealizationResponse = BPMS_API_RESPONSE<{ id: number }>;
export type sendCommitteeRealizationRequest = BPMS_API_REQUEST<
  string,
  {
    bossCollege: number;
    votingType: number;
    studentVicePresidentCollege: number;
    CommitteeId: number;
    headDepartment: number;
    createDate: string;
  }
>;
