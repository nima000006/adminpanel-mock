import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! LAYOUT
export type SelectType = {
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

export type createFloorFormType = {
  floorName: string;
  quality: SelectType;
  description: string;
  status: SelectType;
};

//! APIs
export type ResidenceCreateFloorResponse = BPMS_API_RESPONSE<null>;

export type ResidenceCreateFloorRequest = {
  form: "CreateFloor";
  data: {
    title: string;
    description: string;
    AssociationFacility: {
      facilityId: string;
    }[];
    qualityId: string;
    buildingId: string;
    genderId: string;
  };
};

export type ResidenceUpdateFloorResponse = BPMS_API_RESPONSE<number>;

export type ResidenceUpdateFloorRequest = {
  form: "EditDetailsOfFloor1";
  id: "08cb9bad1f04459fb6934e31924b191b";
  data: {
    title: string;
    qualityId: string;
    description: string;
    recordStatus: string;
    AssociationFacility: {
      facilityId: string;
    }[];
    buildingId: string;
    genderId: string;
    id: number;
  };
};
