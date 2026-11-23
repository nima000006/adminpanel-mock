import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! API
export type DormFeedbackType = {
  id: number;
  title: string;
  recordStatus: number;
};
export type GetDormFeedbackTypesResponse = BPMS_API_RESPONSE<DormFeedbackType[]>;
export type GetDormFeedbackTypesRequest = {
  maxResults: number;
  firstResult: number;
  recordStatus_EQ?: string;
};

export type CreateDormFeedbackTypeResponse = BPMS_API_RESPONSE<number>;
export type CreateDormFeedbackTypesRequest = {
  form: "FeedbackType";
  data: {
    title: string;
    recordStatus: number;
  };
};

export type UpdateDormFeedbackTypesResponse = BPMS_API_RESPONSE<number>;
export type UpdateDormFeedbackTypesRequest = {
  form: "FeedbackType";
  id: "1aa774cef5304619b2e390fab91c2284";
  data: {
    title?: string;
    id: number;
    recordStatus?: number;
  };
};
