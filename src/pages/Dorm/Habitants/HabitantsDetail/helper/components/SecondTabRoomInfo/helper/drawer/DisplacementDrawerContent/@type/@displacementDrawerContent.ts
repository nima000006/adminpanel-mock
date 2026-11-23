import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! API
export type RoomListData = {
  floorid: number;
  tarefe: number;
  price: number;
  freebed: number;
  id: number;
  activebed: number;
  title: string;
};
export type GetRoomListResponse = BPMS_API_RESPONSE<RoomListData[]>;
export type GetRoomListRequest = {
  maxResults: number;
  firstResult: number;
  floorid_EQ: number;
  tarefe_EQ: number;
};

export type BedListData = {
  customerFieldName: string;
  deliverPlanId: number;
  customerFirstname: string;
  bedId: number;
  bedTitle: string;
  customerLastname: string;
  bedTypeTitle: string;
  roomId: number;
  customerBranchName: string;
  customerLevelName: string;
  bedTypeId: number;
  bedNumber: number;
  bedStateId: number;
  customerEnterTermYear: string;
  customerEnterTerm: string;
  bedStateTitle: string;
};

export type GetBedListResponse = BPMS_API_RESPONSE<BedListData[]>;
export type GetBedListRequest = {
  maxResults: number;
  firstResult: number;
  roomId_EQ: string;
  bedTitle_LIKE?: string;
  bedNumber_LIKE?: string;
};

export type AdminSubmitDisplacementRequest = {
  form: string;
  data: {
    bedId: string;
    parentId: string;
    deliverPlanId: string;
    residenceStartDate: string;
    residenceEndDate: string;
    explanationsEveryWhereAdmin: string;
  };
};
export type AdminSubmitDisplacementResponse = BPMS_API_RESPONSE<null>;
