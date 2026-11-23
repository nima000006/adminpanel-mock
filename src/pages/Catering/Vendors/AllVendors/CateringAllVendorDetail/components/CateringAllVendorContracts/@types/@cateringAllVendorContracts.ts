export type GetDetailAllVendorsContractsRequest = {
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
    startDate?: string;
    endDate?: string;
    branchIds?: number[];
    statusType?: number[];
    contractStatus?: number[];
    startCreatedDate?: string;
    endCreatedDate?: string;
    vendorProvinceIds?: number[];
    vendorCityIds?: number[];
  };
};
