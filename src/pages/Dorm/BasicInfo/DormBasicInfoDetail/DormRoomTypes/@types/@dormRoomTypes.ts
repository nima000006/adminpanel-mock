import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! APIs
export type CreateDormRoomTypesResponse = BPMS_API_RESPONSE<number>;

export type CreateDormRoomTypesRequest = {
  form: "TypeAssignment";
  data: {
    title: string;
    recordStatus: 1;
  };
};

export type UpdateDormRoomTypesResponse = BPMS_API_RESPONSE<number>;

export type UpdateDormRoomTypesRequest = {
  form: "RoomType";
  id: "b5c04f54f4a34e009049ee1ceaa7019a";
  data: {
    title?: string;
    recordStatus?: "3" | "1";
    id: number;
  };
};
