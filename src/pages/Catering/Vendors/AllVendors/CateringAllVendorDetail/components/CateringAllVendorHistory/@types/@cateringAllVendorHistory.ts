export type GetAllVendorHistoryRequest = {
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

export type GetAllVendorHistoryContent = {
  revisionNumber: number;
  revisionType: string;
  modifiedBy: string;
  modifiedDate: string;
};

export type GetAllVendorHistoryResponse = {
  content: GetAllVendorHistoryContent[];
  totalElements: number;
  totalPages: number;
  last: boolean;
};

export type GetAllVendorHistoryDetailRequest = {
  id: number;
  revisionNumber: number;
};

export type GetAllVendorHistoryDetailResponse = {
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
