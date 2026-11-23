import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type MyViewFacilityFloorSegmentContentProps = {
  id: string;
};

export type getMyActiveResidenceFloorDetailFacilitySegmentContent = {
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

export type getMyActiveResidenceFloorDetailFacilitySegmentResponse = {
  content: getMyActiveResidenceFloorDetailFacilitySegmentContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type getMyActiveResidenceFloorDetailFacilitySegmentRequest = {
  uuid: string;
  params: {
    pageSize: number;
    pageNumber: number;
    sortBy?: string;
    sortDirection?: string;
  };
};
