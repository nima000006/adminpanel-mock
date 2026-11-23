import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! APIs
export type CreateDormPaymentMethodTypesResponse = BPMS_API_RESPONSE<number>;
export type CreateDormPaymentMethodTypesRequest = {
  form: "PaymentMethod";
  data: {
    title: string;
    recordStatus: number;
  };
};

export type UpdateDormPaymentMethodTypesResponse = BPMS_API_RESPONSE<number>;
export type UpdateDormPaymentMethodTypesRequest = {
  form: "PaymentMethod";
  id: "881e5c554e124bbda50c279ca88966dc";
  data: {
    title?: string;
    id: number;
    recordStatus?: string;
  };
};

export interface Room {
  id: number;
  title: string;
}

export interface Floor {
  id: number;
  title: string;
  rooms?: Room[];
}

export interface Building {
  id: number;
  title: string;
  floors?: Floor[];
}

export interface DormitoryTreeByIdResponse {
  tenant_id: number | null;
  DormitoryId: number;
  DormitoryTitle: string;
  buildings: string; // JSON string that needs parsing to `Building[]`
}
