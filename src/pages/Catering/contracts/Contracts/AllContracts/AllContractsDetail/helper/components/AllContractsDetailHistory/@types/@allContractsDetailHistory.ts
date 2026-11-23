export type GetAllContractHistoryRequest = {
  params: {
    pageSize: number;
    pageNumber: number;
    sortBy?: string;
    sortDirection?: string;
  };
  body: {
    id: number;
  };
};

export type GetAllContractHistoryContent = {
  revisionNumber: number;
  revisionType: string;
  modifiedBy: string;
  modifiedDate: string;
};

export type GetAllContractHistoryResponse = {
  content: GetAllContractHistoryContent[];
  totalElements: number;
  totalPages: number;
  last: boolean;
};

export type GetAllContractHistoryDetailRequest = {
  id: number;
  revisionNumber: number;
};

export type GetAllContractHistoryDetailResponse = {
  revisionNumber: number;
  revisionDate: string;
  revisionType: string;
  id: number;
  title: string;
  description: string;
  contractUUID: string;
  restaurantId: number;
  restaurantTitle: string;
  restaurantProvinceTitle: string;
  restaurantCityTitle: string;
  vendorId: number;
  vendorTitle: string;
  createdDate: string;
  modifiedDate: string;
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
  statusTitle: string;
  rejectReasonId: number;
  rejectReasonTitle: string;
  rejectDescription: string;
  file1: string;
  file2: string;
  file3: string;
  file4: string;
  file1Title: string;
  file2Title: string;
  file3Title: string;
  file4Title: string;
  createdBy: string;
  modifiedByUsername: string;
  modifiedBy: string;
};
