import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type getActiveResidenceArchivedBedListContent = {
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

export type getActiveResidenceArchivedBedListResponse = {
  content: getActiveResidenceArchivedBedListContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type getActiveResidenceArchivedBedListRequest = {
  uuid: string;
  params: {
    pageNumber: number;
    pageSize: number;
    sortBy?: string;
    sortDirection?: string;
  };
};
