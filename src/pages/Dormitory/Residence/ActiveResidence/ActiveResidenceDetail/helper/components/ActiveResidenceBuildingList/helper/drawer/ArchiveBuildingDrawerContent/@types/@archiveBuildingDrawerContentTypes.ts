import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type getActiveResidenceArchivedBuildingListContent = {
  uuid: string;
  accommodationUuid: string;
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

export type getActiveResidenceArchivedBuildingListResponse = {
  content: getActiveResidenceArchivedBuildingListContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type getActiveResidenceArchivedBuildingListRequest = {
  uuid: string;
  params: {
    title?: string;
    pageNumber: number;
    pageSize: number;
    sortBy?: string;
    sortDirection?: string;
  };
};
