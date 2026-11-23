import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type GetActiveResidenceAllBedListContent = {
  uuid?: string;
  bedNumber?: string;
  title?: string;
  bedType?: IdTitleName;
  bedPosition?: IdTitleName;
  roomUuid?: string;
  roomTitle?: string;
  floorUuid?: string;
  floorTitle?: string;
  buildingUuid?: string;
  buildingTitle?: string;
  createdBy?: string;
  createdDate?: string;
  modifiedBy?: string;
  modifiedDate?: string;
};

export type GetActiveResidenceAllBedListRequest = {
  uuid: string;
  params?: {
    title?: string;
    bedType?: string;
    bedPosition?: string;
    roomTitle?: string;
    floorTitle?: string;
    buildingTitle?: string;
    createdBy?: string;
    createdDateFrom?: string;
    createdDateTo?: string;
    modifiedBy?: string;
    modifiedDateFrom?: string;
    modifiedDateTo?: string;
    branchIds?: number[];
    pageNumber?: number;
    pageSize?: number;
    sortBy?: string;
    sortDirection?: string;
  };
};

export type GetActiveResidenceAllBedListResponse = {
  content?: GetActiveResidenceAllBedListContent[];
  pageNumber?: number;
  pageSize?: number;
  first?: boolean;
  last?: boolean;
  totalElements?: number;
  totalPages?: number;
  size?: number;
};
