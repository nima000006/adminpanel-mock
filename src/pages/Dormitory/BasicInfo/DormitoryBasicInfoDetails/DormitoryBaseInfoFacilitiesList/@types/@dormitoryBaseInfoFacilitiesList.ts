import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type DormitoryBasicInfoFacilitiesListFormType = {
  typeOfFacility: SelectType<IdTitleName>;
  title: string;
  measurement: SelectType<IdTitleName>;
  facilitiesRelatedTo: SelectType<IdTitleName>[];
  checked: boolean;
};

// ! APIs
export type DormitoryFacilitiesListRequest = {
  title?: string;
  amenityCategory?: string;
  unitLevels?: string[];
  visible?: boolean;
  pageSize: number;
  pageNumber: number;
  sort?: string;
  sortDirection?: "ASC" | "DESC";
};

export type DormitoryFacilitiesListItemType = {
  uuid: string;
  title: string;
  unitOfMeasure: IdTitleName;
  amenityCategory: IdTitleName;
  unitLevels: IdTitleName[];
  visible: boolean;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
};

export type DormitoryFacilitiesListResponse = {
  content: DormitoryFacilitiesListItemType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type DormitoryUnitOfMeasureListResponse = IdTitleName[];

export type DormitoryUnitOfLevelListResponse = IdTitleName[];

export type CreateDormitoryFacilityRequest = {
  faTitle: string;
  enTitle?: string;
  arTitle?: string;
  faDescription?: string;
  enDescription?: string;
  arDescription?: string;
  unitOfMeasure: string;
  amenityCategory: string;
  unitLevels: string[];
  quantity?: number;
  visible: boolean;
};

export type CreateDormitoryFacilityResponse = string;

export type EditDormitoryFacilityRequest = {
  id: string;
  body: {
    faDescription?: string;
    enDescription?: string;
    arDescription?: string;
    quantity?: number;
    visible: boolean;
  };
};

export type EditDormitoryFacilityResponse = string;
