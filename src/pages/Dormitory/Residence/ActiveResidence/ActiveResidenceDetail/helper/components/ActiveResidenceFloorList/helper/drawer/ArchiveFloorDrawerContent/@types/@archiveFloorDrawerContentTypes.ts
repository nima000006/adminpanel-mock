import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type getActiveResidenceArchivedFloorListContent = {
  uuid: string;
  buildingUuid: string;
  accommodationUuid: string;
  floorNumber: number;
  title: string;
  qualityGrade: {
    uuid: string;
    title: string;
  };
  amenityCount: number;
  status: IdTitleName;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
};

export type getActiveResidenceArchivedFloorListResponse = {
  content: getActiveResidenceArchivedFloorListContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type getActiveResidenceArchivedFloorListRequest = {
  uuid: string;
  params: {
    title?: string;
    pageNumber: number;
    pageSize: number;
    sortBy?: string;
    sortDirection?: string;
  };
};
