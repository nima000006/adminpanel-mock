import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type ArchiveUnitDrawerContentProps = {
  closeDrawerHandler: () => void;
  id: string;
  buildingTitle: string;
  floorTitle: string;
};

export type getActiveResidenceArchivedUnitListContent = {
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

export type getActiveResidenceArchivedUnitListResponse = {
  content: getActiveResidenceArchivedUnitListContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type getActiveResidenceArchivedUnitListRequest = {
  uuid: string;
  params: {
    pageNumber: number;
    pageSize: number;
    sortBy?: string;
    sortDirection?: string;
  };
};
