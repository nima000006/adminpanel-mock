/** Auto-generated mock data from API/page types. Adjust values as needed for local UI work. */

import type {
  EstelamSajedDetailResponse,
  EstelamSajedBannerResponse,
} from "../../@types/@estelamSajedDetailTypes";

export const ESTELAM_SAJED_DETAIL_RESPONSE_MOCK: EstelamSajedDetailResponse = {
  id: 1,
  accessRequestsStatus: null,
  employeeCode: "0012345678",
  branchName: "نمونه branchName",
  organizationTitle: "نمونه organizationTitle",
  files: [{
  url: "https://example.com",
  id: 1,
}],
  description: "نمونه description",
  user: {
  id: 1,
  firstName: "نمونه firstName",
  enFirstName: "نمونه enFirstName",
  lastName: "نمونه lastName",
  enLastName: "نمونه enLastName",
  username: "نمونه username",
  mobileNumber: "09121234567",
  regionId: 1,
  region: "region-mock",
  email: "user@example.com",
  createdDateTime: "2026-05-02T10:20:27.741127",
},
  createdDate: "2026-05-02T10:20:27.741127",
  modifiedDate: "2026-05-02T10:20:27.741127",
  modifierFirstname: "نمونه modifierFirstname",
  modifierLastname: "نمونه modifierLastname",
  rejectReason: null,
  rejectReasonDescription: "نمونه rejectReasonDescription",
  waitingSeconds: 1,
  modifyBy: "modifyBy-mock",
  positionTitle: "نمونه positionTitle",
};

export const ESTELAM_SAJED_BANNER_RESPONSE_MOCK: EstelamSajedBannerResponse = {
  accepted: 1,
  inProgress: 1,
  rejected: 1,
};
