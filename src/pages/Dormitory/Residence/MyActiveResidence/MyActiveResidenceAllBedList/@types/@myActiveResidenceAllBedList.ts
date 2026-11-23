import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type GetMyActiveResidenceAllBedListContent = {
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

export type GetMyActiveResidenceAllBedListRequest = {
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

export type GetMyActiveResidenceAllBedListResponse = {
  content?: GetMyActiveResidenceAllBedListContent[];
  pageNumber?: number;
  pageSize?: number;
  first?: boolean;
  last?: boolean;
  totalElements?: number;
  totalPages?: number;
  size?: number;
};
