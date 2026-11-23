import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type getMyActiveResidenceDetailBannerResponse = {
  uuid: string;
  title: string;
  visible: boolean;
  nominalCapacity: number;
  buildingCount: number;
  floorCount: number;
  roomCount: number;
  bedCount: number;
};

export type MyActiveResidenceDropDownsFormType = {
  building: SelectType<IdTitle>;
  floor: SelectType<IdTitle>;
  unit: SelectType<IdTitle>;
};

export type GetQualityGradeListRequest = {
  accommodationType: string;
  pageSize: number;
  pageNumber: number;
  title?: string;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
};

export type GetQualityGradeListContent = {
  uuid: string;
  title: string;
};

export type GetQualityGradeListResponse = {
  content: GetQualityGradeListContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetAmenityCategoryResponse = IdTitleName[];

export type GetAmenityTemplateListRequest = {
  pageSize: number;
  pageNumber: number;
  unitLevel: string;
  amenityCategories?: string;
};

export type GetAmenityTemplateListContent = {
  uuid: string;
  title: string;
  amenityCategory: IdTitleName;
  unitLevel: IdTitleName[];
  iconKey: string;
  template: boolean;
};

export type GetAmenityTemplateListResponse = {
  content: GetAmenityTemplateListContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
