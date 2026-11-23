export type ViewFloorInfoSegmentContentProps = {
  id: string;
};

export type getActiveResidenceFloorDetailInfoSegmentResponse = {
  uuid: string;
  buildingUuid: string;
  accommodationUuid: string;
  roomCount: number;
  bedCount: number;
  roomCapacityStats: {
    capacity: number;
    count: number;
  }[];
  floorNumber: number;
  title: string;
  qualityGrade: {
    uuid: string;
    title: string;
  };
};
