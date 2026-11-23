export type GetMyVendorHistoryRequest = {
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

export type GetMyVendorHistoryContent = {
  revisionNumber: number;
  revisionType: string;
  modifiedBy: string;
  modifiedDate: string;
};

export type GetMyVendorHistoryResponse = {
  content: GetMyVendorHistoryContent[];
  totalElements: number;
  totalPages: number;
  last: boolean;
};

export type GetMyVendorHistoryDetailRequest = {
  id: number;
  revisionNumber: number;
};

export type GetMyVendorHistoryDetailResponse = {
  revisionNumber: number;
  revisionDate: string;
  revisionType: string;
  id: number;
  parentVendorId: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
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
  managerFirstName: string;
  managerLastName: string;
  managerUserName: string;
  managerUserId: number;
  managerMobile: string;
  logoName: string;
  logoUrl: string;
  coverName: string;
  coverUrl: string;
  phone1: string;
  phone2: string;
  createdDate: string;
  modifiedDate: string;
  modifiedByUsername: string;
  modifiedBy: string;
  nationalNom: string;
  economicNom: string;
  postalCode: string;
  provinceId: number;
  cityId: number;
  provinceTitle: string;
  cityTitle: string;
  branchId: number;
  branchCodes: number[];
  iban: string;
  mainBranch: boolean;
};
