export type ViewBuildingInfoSegmentContentProps = {
  id: string;
};

export type roomCapacityStatsItems = {
  capacity: number;
  count: number;
};

export type imagesItems = {
  uuid: string;
  fileName: string;
  objectName: string;
  url: string;
};

export type getActiveResidenceBuildingDetailResponse = {
  uuid: string;
  accommodationUuid: string;
  addressUuid: string;
  floorCount: number;
  roomCount: number;
  bedCount: number;
  roomCapacityStats: roomCapacityStatsItems[];
  images: imagesItems[];
  title: string;
  qualityGrade: {
    uuid: string;
    title: string;
  };
  cityTitle: string;
  builtUpArea: 0;
  livingArea: number;
  commonArea: number;
  zipCode: string;
  phone: string;
  provinceTitle: string;
  address: string;
  latitude: number;
  longitude: number;
};
