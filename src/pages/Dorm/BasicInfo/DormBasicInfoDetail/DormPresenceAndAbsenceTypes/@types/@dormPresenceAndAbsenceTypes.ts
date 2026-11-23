import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! LAYOUT
export type DormBasicInfoDataSourceType = {
  id: number;
  type: string;
  status: boolean;
};

//! API
export type DormPresenceAndAbsence = {
  id: number;
  title: string;
  recordStatus: number;
};
export type GetDormPresenceAndAbsenceTypesResponse = BPMS_API_RESPONSE<
  DormPresenceAndAbsence[]
>;
export type GetDormPresenceAndAbsenceTypesRequest = {
  maxResults: number;
  firstResult: number;
  recordStatus_EQ?: string;
};

export type CreateDormPresenceAndAbsenceTypeResponse = BPMS_API_RESPONSE<number>;
export type CreateDormPresenceAndAbsenceTypesRequest = {
  form: "PresenceAbsenceList";
  data: {
    title: string;
    recordStatus: number;
  };
};

export type UpdateDormPresenceAndAbsenceTypesResponse = BPMS_API_RESPONSE<number>;
export type UpdateDormPresenceAndAbsenceTypesRequest = {
  form: "PresenceAbsenceList";
  id: "fd60cd4ed8384ea39a4d7a750df464c0";
  data: {
    title?: string;
    id: number;
    recordStatus?: number;
  };
};
