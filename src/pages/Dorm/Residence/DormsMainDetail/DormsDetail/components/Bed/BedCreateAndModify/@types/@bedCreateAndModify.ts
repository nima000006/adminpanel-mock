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
    recordStatus: number;
  };
  code: number;
};

export type BedCreateFormType = {
  bedType: SelectType;
  quality: SelectType;
  status: SelectType;
  bottBedTitle: string;
  bottBedNumber: string;
  bottPropertyNumber: string;
  bottDescription: string;
  topBedTitle: string;
  topBedNumber: string;
  topPropertyNumber: string;
  topDescription: string;
};

//! APIs
export type DormBedListTypes = {
  recordStatus: number;
  id: number;
  title: string;
};

export type GetDormBedTypesResponse = BPMS_API_RESPONSE<DormBedListTypes[]>;
export type GetDormBedTypesRequest = {
  maxResults: number;
  firstResult: number;
  recordStatus_EQ?: string;
};

export type ResidenceCreateBedResponse = BPMS_API_RESPONSE<null>;

export type ResidenceCreateBedRequest = {
  form: "CreateBed";
  data: {
    title: string;
    bedTypeId: string;
    description: string;
    buildingid: string;
    bedNumber: string;
    flatFloor: string;
    qualityId: string;
    roomId: string;
    dormitoryid: string;
    AssetTag: string;
    floorId: string;
  };
};

export type ResidenceUpdateBedResponse = BPMS_API_RESPONSE<number>;

export type ResidenceUpdateBedRequest = {
  form: "ViewBedDetails";
  id: "19f5755d39ad44be97b46e7b339aaa97";
  data: {
    title: string;
    bedTypeId: number;
    recordStatus: string;
    bedNumber: number;
    qualityId: number;
    AssetTag: string;
    description: string;
    id: number;
  };
};
