import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type MyModifyFloorDrawerContentFormType = {
  floor: SelectType<IdTitle>;
  floorTitle: string;
  quality: SelectType<IdTitle>;
  amenityFilter: SelectType<IdTitle>[];
};

export type CreateFloorAmenityBody = {
  templateUuid: string;
  quantity: number;
  faDescription: string;
  enDescription?: string;
  arDescription?: string;
};

export type CreateFloorRequest = {
  uuid: string;
  body: {
    floorNumber: number;
    faTitle: string;
    enTitle?: string;
    arTitle?: string;
    qualityGradeUuid?: string;
    amenities: CreateFloorAmenityBody[];
  };
};

export type CreateFloorResponse = string;

export type EditFloorAmenityBody = {
  templateUuid?: string;
  quantity: number;
  faDescription: string;
  enDescription?: string;
  arDescription?: string;
  uuid?: string;
};

export type EditFloorRequest = {
  uuid: string;
  body: {
    faTitle: string;
    enTitle?: string;
    arTitle?: string;
    qualityGradeUuid?: string;
    amenities: EditFloorAmenityBody[];
  };
};

export type EditFloorResponse = string;

export type GetEditFloorResponse = {
  uuid: string;
  buildingUuid: string;
  accommodationUuid: string;
  roomCount: number;
  bedCount: number;
  roomCapacityStats: {
    capacity: number;
    count: number;
  }[];
  floorNumber: number;
  title: string;
  qualityGrade: {
    uuid: string;
    title: string;
  };
};

export type GetFloorAmenitiesSelectAndValueRequest = {
  uuid: string;
  params: {
    pageNumber: number;
    pageSize: number;
    sort?: string;
    sortDirection?: "ASC" | "DESC";
  };
};

export type GetFloorAmenitiesSelectAndValueContent = {
  uuid: string;
  floorUuid: string;
  buildingUuid: string;
  accommodationUuid: string;
  templateUuid: string;
  title: string;
  description: string;
  amenityCategory: IdTitleName;
  quantity: number;
  unitOfMeasure: IdTitleName;
  template: boolean;
  createdBy: string;
  createdDate: string;
};

export type GetFloorAmenitiesSelectAndValueResponse = {
  content: GetFloorAmenitiesSelectAndValueContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};
