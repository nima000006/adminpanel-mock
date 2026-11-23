export type GetMyRequestContractStatusAnalyticsRequest = {
  title?: string;
  contractTitle?: string;
  uuid?: string;
  contractUid?: string;
  restaurantIds?: number[];
  vendorIds?: number[];
  restaurantTitle?: string;
  vendorTitle?: string;
  startDate?: string;
  endDate?: string;
  branchIds?: number[];
  statusType?: number[];
  contractStatus?: number[];
  startCreatedDate?: string;
  endCreatedDate?: string;
  vendorProvinceIds?: number[];
  vendorCityIds?: number[];
  restaurantProvinceIds?: number[];
  restaurantCityIds?: number[];
};

export type GetMyRequestContractStatusAnalyticsResponse = {
  requestedNewCounts: number;
  requestedExtendCounts: number;
  requestedCopyCounts: number;
  submittedNewCounts: number;
  submittedExtendCounts: number;
  submittedCopyCounts: number;
  rejectedCounts: number;
  acceptedCopyCounts: number;
  acceptedExtendCounts: number;
  acceptedNewCounts: number;
};
