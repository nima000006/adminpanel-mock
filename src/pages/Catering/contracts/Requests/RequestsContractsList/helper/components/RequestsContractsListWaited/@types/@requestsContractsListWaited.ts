import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type RequestsContractsListWaitedAdvanceFilterFormType = {
  vendorProvince: SelectType<IdTitle>[];
  vendorCity: SelectType<IdTitle>[];
  restaurantProvince: SelectType<IdTitle>[];
  restaurantCity: SelectType<IdTitle>[];
  branch: SelectType<IdTitle>[];
  self: SelectType<IdTitle>[];
  supplier: SelectType<IdTitle>[];
  requestType: SelectType<IdTitle>[];
  date: [string, string];
};

export type GetAllRequestContractsViewRequest = {
  id: number;
};

export type GetAllRequestContractsViewResponse = {
  id: number;
  title: string;
  description: string;
  restaurantTitle: string;
  restaurantProvinceTitle: string;
  restaurantCityTitle: string;
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
  createdBy: string;
  modifiedByUsername: string;
  modifiedBy: string;
};
