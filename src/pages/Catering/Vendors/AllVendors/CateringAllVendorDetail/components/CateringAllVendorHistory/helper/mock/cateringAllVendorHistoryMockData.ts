/** Auto-generated mock data from API/page types. Adjust values as needed for local UI work. */

import type {
  GetAllVendorHistoryResponse,
  GetAllVendorHistoryDetailResponse,
} from "../../@types/@cateringAllVendorHistory";

export const GET_ALL_VENDOR_HISTORY_RESPONSE_MOCK: GetAllVendorHistoryResponse = {
  content: [{
  revisionNumber: 1,
  revisionType: "revisionType-mock",
  modifiedBy: "modifiedBy-mock",
  modifiedDate: "2026-05-02T10:20:27.741127",
}],
  totalElements: 10,
  totalPages: 0,
  last: true,
};

export const GET_ALL_VENDOR_HISTORY_DETAIL_RESPONSE_MOCK: GetAllVendorHistoryDetailResponse = {
  revisionNumber: 1,
  revisionDate: "2026-05-02T10:20:27.741127",
  revisionType: "revisionType-mock",
  id: 1,
  parentVendorId: 1,
  title: "نمونه title",
  description: "نمونه description",
  latitude: 1,
  longitude: 1,
  address: "address-mock",
  statusType: {
  id: 1,
  title: "نمونه title",
  faTitle: "نمونه faTitle",
},
  deActiveReason: {
  id: 1,
  title: "نمونه title",
  faTitle: "نمونه faTitle",
},
  managerFirstName: "نمونه managerFirstName",
  managerLastName: "نمونه managerLastName",
  managerUserName: "نمونه managerUserName",
  managerUserId: 1,
  managerMobile: "09121234567",
  logoName: "نمونه logoName",
  logoUrl: "https://example.com",
  coverName: "نمونه coverName",
  coverUrl: "https://example.com",
  phone1: "09121234567",
  phone2: "09121234567",
  createdDate: "2026-05-02T10:20:27.741127",
  modifiedDate: "2026-05-02T10:20:27.741127",
  modifiedByUsername: "نمونه modifiedByUsername",
  modifiedBy: "modifiedBy-mock",
  nationalNom: "0012345678",
  economicNom: "economicNom-mock",
  postalCode: "0012345678",
  provinceId: 1,
  cityId: 1,
  provinceTitle: "نمونه provinceTitle",
  cityTitle: "نمونه cityTitle",
  branchId: 1,
  branchCodes: [1],
  iban: "iban-mock",
  mainBranch: true,
};

export const GET_ALL_VENDOR_HISTORY_CONTENT_LIST_MOCK: GetAllVendorHistoryContent[] = [
{
  revisionNumber: 1,
  revisionType: "revisionType-mock",
  modifiedBy: "modifiedBy-mock",
  modifiedDate: "2026-05-02T10:20:27.741127",
},
{
  revisionNumber: 2,
  revisionType: "revisionType-mock-2",
  modifiedBy: "modifiedBy-mock-2",
  modifiedDate: "2026-05-02T10:20:27.741127",
},
];
