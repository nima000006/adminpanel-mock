import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! LAYOUT
export type DormBasicInfoDataSourceType = {
  id: number;
  type: string;
  countBranch: number;
  status: boolean;
};

//! APIs
export type RuleAndPrincipleTypeList = {
  recordStatus: number;
  id: number;
  title: string;
};

export type GetRuleAndPrincipleTypeResponse = BPMS_API_RESPONSE<
  RuleAndPrincipleTypeList[]
>;
export type GetRuleAndPrincipleTypeRequest = {
  maxResults: number;
  firstResult: number;
  recordStatus_EQ?: string;
};

export type CreateDormRuleAndPrincipleTypesResponse = BPMS_API_RESPONSE<number>;

export type CreateDormRuleAndPrincipleTypesRequest = {
  form: "RuleAndPrincipleType";
  data: {
    title: string;
    recordStatus: 1; // when create the recordStatus must be 1
  };
};

export type UpdateDormRuleAndPrincipleTypesResponse = BPMS_API_RESPONSE<number>;

export type UpdateDormRuleAndPrincipleTypesRequest = {
  form: "RuleAndPrincipleType";
  id: "d8cc8f6322d34656874c88811a481e2b";
  data: {
    title?: string;
    id: number;
    recordStatus?: 1 | 3; // 1: active , 3: inactive
  };
};
