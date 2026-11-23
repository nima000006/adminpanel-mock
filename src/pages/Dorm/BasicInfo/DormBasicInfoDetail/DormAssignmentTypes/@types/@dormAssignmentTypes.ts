import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! APIs
export type AssignmentListType = {
  recordStatus: number;
  id: number;
  title: string;
};

export type GetAssignmentTypeResponse = BPMS_API_RESPONSE<AssignmentListType[]>;
export type GetAssignmentTypeRequest = {
  maxResults: number;
  firstResult: number;
  recordStatus_EQ?: string;
};

export type CreateDormAssignmentTypesResponse = BPMS_API_RESPONSE<number>;

export type CreateDormAssignmentTypesRequest = {
  form: "TypeAssignment";
  data: {
    title: string;
    recordStatus: 1; // when create the recordStatus must be 1
  };
};

export type UpdateDormAssignmentTypesResponse = BPMS_API_RESPONSE<number>;

export type UpdateDormAssignmentTypesRequest = {
  form: "TypeAssignment";
  id: "b2d1d025983d445484e5797e533d64ef";
  data: {
    title?: string;
    id: number;
    recordStatus?: 1 | 3; // 1: active , 3: inactive
  };
};
