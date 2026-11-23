import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! API
export type GetTariffTaskIdResponse = BPMS_API_RESPONSE<{ id: string }[]>;
export type GetTariffTaskIdRequest = {
  processVariables: [{ name: string; operator: string; value: number }];
};
