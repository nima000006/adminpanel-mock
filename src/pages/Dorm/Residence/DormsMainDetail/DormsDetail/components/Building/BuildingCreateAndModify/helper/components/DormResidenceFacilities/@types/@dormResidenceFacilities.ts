import { FormInstance } from "antd";

import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

import { DormFacilitiesType } from "../../../../@types/@buildingCreateAndModify";

//! LAYOUT
export type DormResidenceFacilitiesProps = {
  facilitiesData: DormFacilitiesType[];
  setFacilitiesData: React.Dispatch<React.SetStateAction<DormFacilitiesType[]>>;
  facilityList: DormResidenceFacilityTypes[];
  facilityTypeData: DormResidenceFacilityTypes[] | undefined;
};

type SelectType = {
  label: string;
  title: string;
  value: string;
  key: number;
  item: {
    id: number;
    title: string;
    unit?: string;
  };
  code: number;
};

export type modifyDormFacilityForm = FormInstance<{
  facilityType: SelectType;
  facilityTitle: SelectType;
  amount: string;
}>;

export type EditFacilitiesTypes = {
  data: null | DormFacilitiesType;
  isOpen: boolean;
};

//! APIs
export type DormResidenceFacilityTypes = {
  recordStatus: number;
  id: number;
  title: string;
};

export type GetDormResidenceFacilityTypesResponse = BPMS_API_RESPONSE<
  DormResidenceFacilityTypes[]
>;
export type GetDormResidenceFacilityTypesRequest = {
  maxResults: number;
  firstResult: number;
};

export type DormResidenceFacilityListTypes = {
  unit: string;
  recordStatus: number;
  facilityTypeId: number;
  id: number;
  title: string;
  AssociationCategoryFacilityType_title?: string;
  IsOptional: number;
};

export type GetDormResidenceFacilityListResponse = BPMS_API_RESPONSE<
  DormResidenceFacilityListTypes[]
>;

export type GetDormResidenceFacilityListRequest = {
  maxResults: number;
  firstResult: number;
  facilityTypeId_EQ?: string;
  recordStatus_EQ?: string;
  title_LIKE?: string;
  IsOptional_EQ?: number | string;
};
