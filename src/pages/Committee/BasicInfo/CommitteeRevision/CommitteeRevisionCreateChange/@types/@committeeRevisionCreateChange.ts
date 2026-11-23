import { BPMS_API_RESPONSE } from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! API
export type GetCommitteeRevisionCreateChangeResponse = BPMS_API_RESPONSE<{
  tenant_id: null;
  AssociationBossCommitte: {
    tenant_id: null;
    firstName: string;
    lastName: string;
    nationalCode: string;
    mobile: string;
    id: number;
    title: string;
  };
  votingType: number;
  representativeFacultyMembers: number;
  presidentStudentCouncil: number;
  AssociationPresidentStudentCouncil: {
    tenant_id: null;
    firstName: string;
    lastName: string;
    nationalCode: string;
    mobile: string;
    id: number;
    title: string;
  };
  provinceId: number;
  AssociationFacultyMember: {
    tenant_id: null;
    firstName: string;
    lastName: string;
    nationalCode: string;
    mobile: string;
    id: number;
    title: string;
  };
  AssociationLeadershipBody: {
    tenant_id: null;
    firstName: string;
    lastName: string;
    nationalCode: string;
    mobile: string;
    id: number;
    title: string;
  };
  bossCommitte: number;
  CommitteeId: number;
  secretaryCommitte: number;
  responsibleLeadershipBody: number;
  studentRepresentative: number;
  AssociationStudentRepresentative: {
    tenant_id: null;
    firstName: string;
    lastName: string;
    nationalCode: string;
    mobile: string;
    id: number;
    title: string;
  };
  AssociationSectetaryPersonnell: {
    tenant_id: null;
    firstName: string;
    lastName: string;
    nationalCode: string;
    mobile: string;
    id: number;
    title: string;
  };
  id: 1;
  AssociationVotingType: {
    tenant_id: null;
    id: number;
    title: string;
  };
  createDate: string;
}>;
export type GetCommitteeRevisionCreateChangeRequest = {
  _data_: {
    id: string;
  };
};
export type sendCommitteeRevisionRequest = {
  form: "ListSelectionMembersAppealsCommittee";
  id: "c7365a09fb30482e9c0125a157494968";
  _data_: {
    CommitteeId: number;
    bossCommitte: number;
    representativeFacultyMembers: number;
    provinceId: number;
    presidentStudentCouncil: number;
    studentRepresentative: number;
    secretaryCommitte: number;
    responsibleLeadershipBody: number;
    votingType: number | undefined;
    tenant_id: null;
    id: number;
    createDate: string;
  };
};
export type sendCommitteeRevisionResponse = BPMS_API_RESPONSE<{
  tenant_id: null;
  votingType: number;
  representativeFacultyMembers: number;
  presidentStudentCouncil: number;
  provinceId: number;
  bossCommitte: number;
  CommitteeId: number;
  secretaryCommitte: number;
  responsibleLeadershipBody: number;
  studentRepresentative: number;
  id: number;
  createDate: string;
}>;
