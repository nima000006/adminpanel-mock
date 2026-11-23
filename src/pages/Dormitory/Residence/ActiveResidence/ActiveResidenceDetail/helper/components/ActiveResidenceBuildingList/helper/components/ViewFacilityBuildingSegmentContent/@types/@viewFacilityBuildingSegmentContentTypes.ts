import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type ViewFacilityBuildingSegmentContentProps = {
  id: string;
};

export type getActiveResidenceBuildingDetailFacilitySegmentContent = {
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

export type getActiveResidenceBuildingDetailFacilitySegmentResponse = {
  content: getActiveResidenceBuildingDetailFacilitySegmentContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type getActiveResidenceBuildingDetailFacilitySegmentRequest = {
  uuid: string;
  params: {
    pageSize: number;
    pageNumber: number;
    sortBy?: string;
    sortDirection?: string;
  };
};
