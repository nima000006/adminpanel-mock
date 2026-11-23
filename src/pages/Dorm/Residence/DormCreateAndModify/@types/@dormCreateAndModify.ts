import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! LAYOUTs
type SelectType<T> = {
  label: string;
  title: string;
  value: string;
  key: number;
  item: T;
  code: number;
};
export type ResidenceModifyFormType = {
  residenceName: string;
  residenceType: SelectType<{
    tenant_id: null;
    recordStatus: number;
    createTime: null;
    updateByUserId: string;
    updeteDate: string;
    updateTime: string;
    id: number;
    createByUserId: null;
    title: string;
    createDate: null;
  }>;
  quality: SelectType<{
    tenant_id: null;
    recordStatus: number;
    createTime: null;
    updateByUserId: string;
    updeteDate: string;
    updateTime: string;
    id: number;
    createByUserId: null;
    title: string;
    createDate: null;
  }>;
  capacity: number;
  branch: SelectType<{
    id: number;
    title: string;
  }>;
  gender: SelectType<{
    tenant_id: null;
    updateDate: string;
    recordStatus: number;
    createTime: null;
    updateByUserId: string;
    updateTime: string;
    id: number;
    createByUserId: null;
    title: string;
    createDate: null;
  }>;
  area: number;
  greenSpaceArea: number;
  province: SelectType<{
    tenant_id: null;
    regionTypeId: number;
    name: string;
    id: number;
    title: string;
    parentId: number;
  }>;
  city: SelectType<{
    tenant_id: null;
    regionTypeId: number;
    name: string;
    id: number;
    title: string;
    parentId: number;
  }>;
  postalCode: string;
  phone: string;
  address: string;
  description: string;
  modalDesc?: string;
  status?: SelectType<{
    title: string;
    id: number;
  }>;
};

export type ResidenceInactiveFormType = { inactiveDesc: string };

//! APIs
export type ResidenceType = {
  recordStatus: number;
  id: number;
  title: string;
};
export type GetResidenceTypeRequest = {
  maxResults: number;
  firstResult: number;
  recordStatus_EQ?: number;
  showInActiveData?: boolean;
};
export type GetResidenceTypeResponse = BPMS_API_RESPONSE<ResidenceType[]>;

export type PlacesAroundDormitoryType = {
  recordStatus: number;
  id: number;
  title: string;
};
export type GetPlacesAroundDormitoryRequest = {
  maxResults: number;
  firstResult: number;
  recordStatus_EQ?: number;
  showInActiveData?: boolean;
};

export type GetPlacesAroundDormitoryResponse = BPMS_API_RESPONSE<
  PlacesAroundDormitoryType[]
>;

export type ResidenceCreateResidenceResponse = BPMS_API_RESPONSE<null>;

export type ResidenceCreateResidenceRequest = {
  form: "CreateDormitory";
  data: {
    title: string;
    branchId: number;
    phoneNumber: string;
    description: string;
    accommodationTypeId: number;
    genderId: number;
    sizeOfDormitory: number;
    sizeOfGreenSpace: number;
    address: string;
    qualityId: number;
    regionId: number;
    latitude: string;
    nominalCapacity: number;
    zipCode: string;
    longitude: string;
    AssociationPlacesAndDormitories: {
      description: string;
      placesId: React.Key;
    }[];
    descriptionRequest: string | undefined;
    id?: string;
  };
};

export type ResidenceUpdateResidenceResponse = BPMS_API_RESPONSE<number>;

export type ResidenceUpdateResidenceRequest = {
  form: "ViewDetailsOfHostel";
  id: "96b76ab15cf64391b7bb70d5141773af";
  data: {
    title: string;
    branchId: number;
    phoneNumber: string;
    description: string;
    accommodationTypeId: number;
    genderId: number;
    sizeOfDormitory: number;
    sizeOfGreenSpace: number;
    address: string;
    recordStatus?: number;
    qualityId: number;
    regionId: number;
    latitude: number;
    nominalCapacity: number;
    zipCode: string;
    longitude: number;
    AssociationPlacesAndDormitories: {
      description: string;
      placesId: React.Key;
    }[];
    id: number;
    descriptionRequest?: string;
  };
};
export type GetDormProvinceRequest = {
  maxResults: number;
  firstResult: number;
};

export type GetDormProvinceResponse = BPMS_API_RESPONSE<
  {
    tenant_id: null;
    regionTypeId: number;
    name: string;
    id: number;
    title: string;
    parentId: number;
  }[]
>;

export type GetDormCityType = {
  tenant_id: null;
  regionTypeId: number;
  name: string;
  id: number;
  title: string;
  parentId: number;
};
export type GetDormCityRequest = {
  parentId_IN: number;
  maxResults: number;
  firstResult: number;
};
export type GetDormCityResponse = BPMS_API_RESPONSE<GetDormCityType[]>;
