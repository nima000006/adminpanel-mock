import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! API
export type CreateDormSubsetRulesResponse = BPMS_API_RESPONSE<number>;
export type CreateDormSubsetRulesRequest = {
  form: "SubsetRules";
  data: {
    title: string;
    typeId: number;
    recordStatus: number;
  };
};

export type UpdateDormSubsetRulesResponse = BPMS_API_RESPONSE<number>;
export type UpdateDormSubsetRulesRequest = {
  form: "SubsetRules";
  id: "ef98ed6496c845f8b2def2faa54ed425";
  data: {
    title?: string;
    id: number;
    typeId: number;
    recordStatus?: number;
  };
};
