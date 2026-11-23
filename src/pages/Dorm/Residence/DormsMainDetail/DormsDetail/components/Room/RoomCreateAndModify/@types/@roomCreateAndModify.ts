import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! LAYOUT
type SelectType = {
  label: string;
  title: string;
  value: string;
  key: number;
  item: {
    id: number;
    title: string;
  };
  code: number;
};

export type RoomCreateFormType = {
  roomTitle: string;
  quality: SelectType;
  area: string;
  numberStandardBedInRoom: SelectType;
  roomType: SelectType;
  parentRoom: SelectType;
  status: SelectType;
  description: string;
};

//! APIs
export type DormRoomListTypes = {
  recordStatus: number;
  id: number;
  title: string;
};

export type GetDormRoomTypesResponse = BPMS_API_RESPONSE<DormRoomListTypes[]>;
export type GetDormRoomTypesRequest = {
  maxResults: number;
  firstResult: number;
  recordStatus_EQ?: string;
};

export type ResidenceCreateRoomResponse = BPMS_API_RESPONSE<null>;

export type ResidenceCreateRoomRequest = {
  form: "CreateRoom";
  data: {
    title: string;
    qualityId: string;
    floorId: string;
    roomTypeId: string;
    area: string;
    genderId: string;
    parentId: string | null;
    numberStandardBedInRoom: string;
    description: string;
    AssociationFileRoom: {
      uploadFileId: string;
    }[];
  };
};

export type ResidenceUpdateRoomResponse = BPMS_API_RESPONSE<number>;

export type ResidenceUpdateRoomRequest = {
  form: "ViewDetailsOfRoom";
  id: "f97278c53e50446bad348f7f92a47abe";
  data: {
    title: string;
    roomTypeId: number;
    qualityId: number;
    parentId: number | null;
    area: number;
    description: string;
    numberStandardBedInRoom: string;
    recordStatus: string;
    AssociationFileRoom: {
      uploadFileId: string;
    }[];
    id: number;
  };
};
