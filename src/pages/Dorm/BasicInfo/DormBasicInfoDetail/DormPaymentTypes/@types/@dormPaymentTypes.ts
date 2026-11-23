import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! API
export type CreateDormPaymentTypesResponse = BPMS_API_RESPONSE<number>;

export type CreateDormPaymentTypesRequest = {
  form: "PaymentType";
  data: {
    title: string;
    recordStatus: string;
  };
};

export type UpdateDormPaymentTypesResponse = BPMS_API_RESPONSE<number>;
export type UpdateDormPaymentTypesRequest = {
  form: "PaymentType";
  id: "ae4548c1742f435a9deb69523b20ddc9";
  data: {
    title?: string;
    id: number;
    recordStatus?: number;
  };
};
