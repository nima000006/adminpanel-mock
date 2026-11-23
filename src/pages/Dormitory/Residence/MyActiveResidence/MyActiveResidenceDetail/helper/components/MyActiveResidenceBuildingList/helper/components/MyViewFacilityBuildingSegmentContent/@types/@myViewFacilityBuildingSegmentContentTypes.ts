import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type MyViewFacilityBuildingSegmentContentProps = {
  id: string;
};

export type getMyActiveResidenceBuildingDetailFacilitySegmentContent = {
  uuid: string;
  buildingUuid: string;
  accommodationUuid: string;
  templateUuid: string;
  title: string;
  description: string;
  amenityCategory: IdTitleName;
  quantity: number;
  unitOfMeasure: IdTitleName;
  template: boolean;
};

export type getMyActiveResidenceBuildingDetailFacilitySegmentResponse = {
  content: getMyActiveResidenceBuildingDetailFacilitySegmentContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type getMyActiveResidenceBuildingDetailFacilitySegmentRequest = {
  uuid: string;
  params: {
    pageSize: number;
    pageNumber: number;
    sortBy?: string;
    sortDirection?: string;
  };
};
