import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type ViewFacilityFloorSegmentContentProps = {
  id: string;
};

export type getActiveResidenceFloorDetailFacilitySegmentContent = {
  uuid: string;
  floorUuid: string;
  accommodationUuid: string;
  templateUuid: string;
  title: string;
  description: string;
  amenityCategory: IdTitleName;
  quantity: number;
  unitOfMeasure: IdTitleName;
  template: boolean;
};

export type getActiveResidenceFloorDetailFacilitySegmentResponse = {
  content: getActiveResidenceFloorDetailFacilitySegmentContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type getActiveResidenceFloorDetailFacilitySegmentRequest = {
  uuid: string;
  params: {
    pageSize: number;
    pageNumber: number;
    sortBy?: string;
    sortDirection?: string;
  };
};
