import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type MyArchiveUnitDrawerContentProps = {
  closeDrawerHandler: () => void;
  id: string;
  buildingTitle: string;
  floorTitle: string;
};

export type getMyActiveResidenceArchivedUnitListContent = {
  uuid: string;
  roomNumber: string;
  faTitle: string;
  enTitle: string;
  arTitle: string;
  roomType: IdTitleName;
  qualityGrade: string;
  capacity: number;
  amenityCount: number;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
};

export type getMyActiveResidenceArchivedUnitListResponse = {
  content: getMyActiveResidenceArchivedUnitListContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type getMyActiveResidenceArchivedUnitListRequest = {
  uuid: string;
  params: {
    pageNumber: number;
    pageSize: number;
    sortBy?: string;
    sortDirection?: string;
  };
};
