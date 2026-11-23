import { GeneralResponse } from "@pages/Business/UsersList/@types/@usersList";

export type ServiceManagementSelectedItemsType = {
  staff: { id: null | number; title: null | string };
  branch: { id: null | number; title: null | string };
};

// @API
export type GetBranchActiveServicesRequest = {
  serviceId: number;
  staffType: number;
  branchServiceType: number;
};

export type BranchActiveServicesRecordType = {
  branchId: number;
  samimMediaDto: {
    id: number;
    samimServiceDto: {
      id: number;
      name: string;
      faTitle: string;
      description: string;
    };
    isActive: boolean;
    imageUrl: string;
  };
};

export type GetBranchActiveServicesResponse = {
  isAll: boolean;
  branchServiceDtoList: BranchActiveServicesRecordType[];
};

export type CreateServiceActiveBranchesRequest = {
  branches: number[];
  serviceId: number;
  isAll: boolean;
  staffType: number;
  branchServiceType: number;
};

export type CreateServiceActiveBranchesResponse = number;

export type UpdateServiceActiveBranchesRequest = {
  branches: number[];
  serviceId: number;
  isAll: boolean;
  staffType: number;
  branchServiceType: number;
};
export type UpdateServiceActiveBranchesResponse = GeneralResponse<any[]>;

export type GetBasicInfoStaffTypeResponse = {
  id: number;
  name: string;
  faTitle: string;
  description: string;
}[];

export type GetBasicInfoBranchServiceResponse = {
  id: number;
  name: string;
  faTitle: string;
  description: string;
}[];
