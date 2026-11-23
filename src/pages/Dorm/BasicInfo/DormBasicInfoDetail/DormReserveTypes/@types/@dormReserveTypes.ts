import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! APIs
export type CreateDormReservationTypesResponse = BPMS_API_RESPONSE<number>;

export type CreateDormReservationTypesRequest = {
  form: "ReservationType";
  data: {
    title: string;
    recordStatus: 1;
  };
};

export type UpdateDormReservationTypesResponse = BPMS_API_RESPONSE<number>;

export type UpdateDormReservationTypesRequest = {
  form: "ReservationType";
  id: "cf0792f4fdb54d10882b7ec97fbb523b";
  data: {
    title?: string;
    recordStatus?: "1" | "3";
    id: number;
  };
};
