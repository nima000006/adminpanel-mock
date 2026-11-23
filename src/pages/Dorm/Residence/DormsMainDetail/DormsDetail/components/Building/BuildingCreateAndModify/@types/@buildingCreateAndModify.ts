import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

export type DormFacilitiesType = {
  title: {
    id: number;
    title: string;
  };
  type: {
    id: number;
    title: string;
  };
  unit: string;
  amount: string;
  id: string;
};

export type SelectType = {
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

export type CreateBuildingFormTypes = {
  buildingname: string;
  gender: SelectType;
  quality: SelectType;
  buildingDesc: string;
  province: SelectType;
  city: SelectType;
  postalCode: string;
  phoneNumber: string;
  buildingArea: number;
  address: string;
  status: SelectType;
  financeRules: SelectType[];
  disciplinaryRules: SelectType[];
  generalRules: SelectType[];
  cancellingRules: SelectType[];
  installmentsRules: SelectType[];
};

//! API
export type ResidenceCreateBuildingResponse = BPMS_API_RESPONSE<null>;

export type ResidenceCreateBuildingRequest = {
  form: string;
  data: {
    title: string;
    regionId: string;
    longitude: string;
    genderId: string;
    zipCode: string;
    latitude: string;
    qualityId: string;
    phoneNumber: string;
    dormitoryId: string;
    description: string;
    sizeOfBuilding: number;
    address: string;
    AssociationRuleAndPrinciple: {
      RuleAndPrincipleId: string;
    }[];
    AssociationScopeOfUseOfFacility: {
      facilityId: string;
      unit: string;
      amount: string;
    }[];
    AssociationfileBuilding: {
      uploadFileId: string;
    }[];
  };
};

export type ResidenceUpdateBuildingResponse = BPMS_API_RESPONSE<number>;

export type ResidenceUpdateBuildingRequest = {
  form: "ViewDetailsOfBuilding";
  id: "052c8d9c6fd64922b4b0675b2ad4e0eb";
  data: {
    title: string;
    regionId: number;
    longitude: number;
    recordStatus: number;
    genderId: number;
    zipCode: string;
    latitude: number;
    qualityId: number;
    sizeOfBuilding: number;
    phoneNumber: string;
    dormitoryId: number;
    description: string;
    address: string;
    AssociationRuleAndPrinciple: {
      RuleAndPrincipleId: string;
    }[];
    AssociationScopeOfUseOfFacility: {
      facilityId: string;
      unit: string;
      amount: string;
    }[];
    AssociationfileBuilding: {
      uploadFileId: string;
    }[];
    id: number;
  };
};

export type DormGenderListTypes = {
  recordStatus: number;
  id: number;
  title: string;
};

export type DormQualityTypes = {
  recordStatus: null;
  id: number;
  title: string;
};

export type GetDormGenderTypesResponse = BPMS_API_RESPONSE<DormGenderListTypes[]>;
export type GetDormGenderTypesRequest = {
  maxResults: number;
  firstResult: number;
  recordStatus_EQ?: string;
};

export type GetDormQualityTypesResponse = BPMS_API_RESPONSE<DormQualityTypes[]>;
export type GetDormQualityTypesRequest = {
  maxResults: number;
  firstResult: number;
  recordStatus_EQ?: string;
};

export type DormRulesTypes = {
  recordStatus: number;
  typeId: number;
  id: number;
  title: string;
};

export type GetDormRulesTypesResponse = BPMS_API_RESPONSE<DormRulesTypes[]>;
export type GetDormRulesTypesRequest = {
  maxResults: number;
  firstResult: number;
  recordStatus_EQ?: string;
  typeId_EQ: number;
};

export type RoomParentType = {
  AssociationFloor_AssociationBuilding_AssociationCategoryDormitory_id: number;
  AssociationFloor_id: number;
  AssociationFloor_AssociationBuilding_id: number;
  AssociationFloor_title: string;
  id: number;
  title: string;
  AssociationFloor_AssociationBuilding_title: string;
  AssociationFloor_AssociationBuilding_AssociationCategoryDormitory_title: string;
};
export type getARoomParentInDormResponse = BPMS_API_RESPONSE<RoomParentType[]>;
export type getARoomParentInDormRequest = {
  maxResults?: number;
  firstResult?: number;
  AssociationFloor_AssociationBuilding_AssociationCategoryDormitory_id_EQ: number;
};
