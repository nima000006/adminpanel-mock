import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type getMyActiveResidenceArchivedBuildingListContent = {
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

export type getMyActiveResidenceArchivedBuildingListResponse = {
  content: getMyActiveResidenceArchivedBuildingListContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type getMyActiveResidenceArchivedBuildingListRequest = {
  uuid: string;
  params: {
    title?: string;
    pageNumber: number;
    pageSize: number;
    sortBy?: string;
    sortDirection?: string;
  };
};
