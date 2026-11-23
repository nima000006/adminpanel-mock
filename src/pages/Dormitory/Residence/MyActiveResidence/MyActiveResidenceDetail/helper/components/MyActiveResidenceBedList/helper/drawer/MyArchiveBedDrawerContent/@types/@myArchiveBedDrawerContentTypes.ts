import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type getMyActiveResidenceArchivedBedListContent = {
  uuid: string;
  bedNumber: string;
  title: string;
  bedType: IdTitleName;
  bedPosition: IdTitleName;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
};

export type getMyActiveResidenceArchivedBedListResponse = {
  content: getMyActiveResidenceArchivedBedListContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type getMyActiveResidenceArchivedBedListRequest = {
  uuid: string;
  params: {
    pageNumber: number;
    pageSize: number;
    sortBy?: string;
    sortDirection?: string;
  };
};
