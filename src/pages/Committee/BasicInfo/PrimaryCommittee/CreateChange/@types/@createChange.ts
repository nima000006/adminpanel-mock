import { BPMS_API_RESPONSE } from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! GENERAL
//! LAYOUT
//! API
export type GetPrimaryCommitteeCreateChangeRequest = {
  _data_: {
    id: string;
  };
};

export type GetPrimaryCommitteeCreateChangeResponse = BPMS_API_RESPONSE<{
  tenant_id: null;
  votingType: number;
  culturalCommitte: number;
  legalCommitte: number;
  AssociationBosPersonnel: {
    tenant_id: null;
    firstName: string;
    lastName: string;
    nationalCode: string;
    mobile: string;
    id: number;
    title: string;
  };
  AssociationAcademicPersonnel: {
    tenant_id: null;
    firstName: string;
    lastName: string;
    nationalCode: string;
    mobile: string;
    id: number;
    title: string;
  };
  uniId: number;
  CommitteeId: number;
  secretaryCommitte: number;
  AssociationSectetaryPersonnel: {
    tenant_id: null;
    firstName: string;
    lastName: string;
    nationalCode: string;
    mobile: string;
    id: number;
    title: string;
  };
  AssociationStudentInfo: {
    tenant_id: null;
    firstName: string;
    lastName: string;
    nationalCode: string;
    mobile: string;
    id: number;
    title: string;
  };
  studentCommitte: number;
  AssociationCulturalPersonnel: {
    tenant_id: null;
    firstName: string;
    lastName: string;
    nationalCode: string;
    mobile: string;
    id: number;
    title: string;
  };
  bosCommitte: number;
  academicCommitte: number;
  AssociationLegalPersonnel: {
    tenant_id: null;
    firstName: string;
    lastName: string;
    nationalCode: string;
    mobile: string;
    id: number;
    title: string;
  };
  AssociationCommittee: {
    tenant_id: null;
    id: number;
    title: string;
  };
  id: number;
  AssociationVotingType: {
    tenant_id: null;
    id: number;
    title: string;
  };
  createDate: string;
}>;
export type GetPrimaryCommitteePersonnelInfo = {
  id: number;
  title: string;
};
export type GetPrimaryCommitteePersonnelInfoResponse = {
  data: GetPrimaryCommitteePersonnelInfo[];
  msg: string;
  status: number;
};
export type sendPrimaryCommitteeRequest = {
  form: "ListSelectionMembersPreliminaryCommittee";
  id: "1b6878b3163b4d39a502fc203e53bf39";
  _data_: {
    CommitteeId: number;
    bosCommitte: number;
    legalCommitte: number;
    studentCommitte: number;
    votingType: number | undefined;
    uniId: number;
    culturalCommitte: number;
    academicCommitte: number;
    secretaryCommitte: number;
    tenant_id: null;
    createDate: string;
  };
};
export type sendPrimaryCommitteeResponse = BPMS_API_RESPONSE<{
  tenant_id: null;
  votingType: number;
  culturalCommitte: number;
  legalCommitte: number;
  uniId: number;
  CommitteeId: number;
  secretaryCommitte: number;
  studentCommitte: number;
  bosCommitte: number;
  academicCommitte: number;
  id: number;
  createDate: string;
}>;
