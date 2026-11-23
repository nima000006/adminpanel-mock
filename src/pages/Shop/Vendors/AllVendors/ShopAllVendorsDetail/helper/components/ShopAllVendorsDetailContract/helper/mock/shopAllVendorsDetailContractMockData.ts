/** Auto-generated mock data from API/page types. Adjust values as needed for local UI work. */

import type {
  GetVendorContractListResponse,
  ShopVendorContractBeneficiaryListItem,
  GetContractTemplateResponse,
} from "../../@types/@shopAllVendorsDetailContract";

export const GET_VENDOR_CONTRACT_LIST_RESPONSE_MOCK: GetVendorContractListResponse = {
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  supplierUuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  supplierRuleBeneficiaryId: 1,
  status: {
  id: 1,
  name: "نمونه name",
  title: "نمونه title",
},
  activatedDate: "2026-05-02T10:20:27.741127",
  deactivatedDate: "2026-05-02T10:20:27.741127",
  beneficiaries: [{
  uuid: "30acd599-f0fd-4d67-9593-aab003100e2e",
  beneficiaryType: {
  id: 1,
  name: "نمونه name",
  title: "نمونه title",
},
  username: "نمونه username",
  businessId: 1,
  businessName: "نمونه businessName",
  branchId: 1,
  branchTitle: "نمونه branchTitle",
  partitionCoefficient: 1,
  partitionCoefficientType: {
  id: 1,
  name: "نمونه name",
  title: "نمونه title",
},
}],
};

export const SHOP_VENDOR_CONTRACT_BENEFICIARY_LIST_ITEM_MOCK: ShopVendorContractBeneficiaryListItem = {
  id: 1,
  businessId: 1,
  businessName: "نمونه businessName",
  branchId: 1,
  branchName: "نمونه branchName",
  partitionCoefficient: 1,
  supplier: true,
};

export const GET_CONTRACT_TEMPLATE_RESPONSE_MOCK: GetContractTemplateResponse = {
  content: [{
  id: 1,
  title: "نمونه title",
  serviceCount: 10,
  startDate: "2026-05-02T10:20:27.741127",
  endDate: "2026-05-02T10:20:27.741127",
}],
  pageNumber: 0,
  pageSize: 0,
  first: true,
  last: true,
  totalElements: 10,
  totalPages: 0,
  size: 10,
};

export const GET_CONTRACT_TEMPLATE_ITEM_TYPE_LIST_MOCK: GetContractTemplateItemType[] = [
{
  id: 1,
  title: "نمونه title",
  serviceCount: 10,
  startDate: "2026-05-02T10:20:27.741127",
  endDate: "2026-05-02T10:20:27.741127",
},
{
  id: 2,
  title: "نمونه title",
  serviceCount: 10,
  startDate: "2026-05-02T10:20:27.741127",
  endDate: "2026-05-02T10:20:27.741127",
},
];
