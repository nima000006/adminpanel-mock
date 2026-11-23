export type GetDetailAllSelfsContractsRequest = {
  params: {
    pageSize: number;
    pageNumber: number;
    sortBy?: string;
    sortDirection?: string;
  };
  body: {
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
};

export type GetDetailAllSelfsContractsContent = {
  id: number;
  title: string;
  description: string;
  restaurantTitle: string;
  vendorTitle: string;
  createdDate: string;
  modifiedDate: string;
  restaurantId: number;
  vendorId: number;
  startedDate: string;
  endDate: string;
  providerPercentage: number;
  vendorPercentage: number;
  restaurantPercentage: number;
  statusType: {
    id: number;
    title: string;
    faTitle: string;
  };
  deActiveReason: {
    id: number;
    title: string;
    faTitle: string;
  };
  status: number;
  rejectReasonId: number;
  rejectReasonTitle: string;
  rejectDescription: string;
  contractUUID: string;
  file1: string;
  file2: string;
  file3: string;
  file4: string;
  file1Title: string;
  file2Title: string;
  file3Title: string;
  file4Title: string;
  modifiedByUsername: string;
  modifiedBy: string;
  restaurantProvinceTitle: string;
  restaurantCityTitle: string;
  createdBy: string;
  restaurantOwnerBranchName: string;
  restaurantOwnerBranchCode: string;
};
export type GetDetailAllSelfsContractsResponse = {
  content: GetDetailAllSelfsContractsContent[];
  totalElements: number;
  totalPages: number;
  last: boolean;
};
