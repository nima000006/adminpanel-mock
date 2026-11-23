/** Auto-generated mock data from API/page types. Adjust values as needed for local UI work. */

import type {
  GetBranchActiveServicesResponse,
  GetBasicInfoStaffTypeResponse,
  GetBasicInfoBranchServiceResponse,
} from "../../@types/@servicesManagement";

export const GET_BRANCH_ACTIVE_SERVICES_RESPONSE_MOCK: GetBranchActiveServicesResponse = {
  isAll: true,
  branchServiceDtoList: [{
  branchId: 1,
  samimMediaDto: {
  id: 1,
  samimServiceDto: {
  id: 1,
  name: "نمونه name",
  faTitle: "نمونه faTitle",
  description: "نمونه description",
},
  isActive: true,
  imageUrl: "https://example.com",
},
}],
};

export const GET_BASIC_INFO_STAFF_TYPE_RESPONSE_MOCK: GetBasicInfoStaffTypeResponse = {
  id: 1,
  name: "نمونه name",
  faTitle: "نمونه faTitle",
  description: "نمونه description",
};

export const GET_BASIC_INFO_BRANCH_SERVICE_RESPONSE_MOCK: GetBasicInfoBranchServiceResponse = {
  id: 1,
  name: "نمونه name",
  faTitle: "نمونه faTitle",
  description: "نمونه description",
};
