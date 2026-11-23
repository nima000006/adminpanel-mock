//! GENERAL
//! LAYOUT

import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! API
export type GetRealizationCommitteeTab = {
  AssociationBossCollege_title: string;
  AssociationHeadDepartment_title: string;
  collegeId: number;
  AssociationVotingType_title: string;
  id: number;
  AssociationStudentVicePresidentCollege_title: string;
  createDate: string;
};
export type GetRealizationCommitteeTabResponse = BPMS_API_RESPONSE<
  GetRealizationCommitteeTab[]
>;
