/** Auto-generated mock data from API/page types. Adjust values as needed for local UI work. */

import type {
  GetContractsDetailBaseInfoResponse,
} from "../../@types/@getContractsDetailBaseInfo";

export const GET_CONTRACTS_DETAIL_BASE_INFO_RESPONSE_MOCK: GetContractsDetailBaseInfoResponse = {
  id: 1,
  title: "نمونه title",
  parties: [{
  id: 1,
  name: "نمونه name",
  nationalCode: "0012345678",
}],
  createdBy: "2026-05-02T10:20:27.741127",
  createdDate: "2026-05-02T10:20:27.741127",
  startDate: "2026-05-02T10:20:27.741127",
  contractStatus: "ACTIVE",
  contractTitle: "نمونه contractTitle",
  beneficiaries: [{
  categoryTitle: "نمونه categoryTitle",
  supplierName: "نمونه supplierName",
  template: 1,
  ruleBeneficiaries: 1,
  hasTax: true,
  indexNumber: 1,
  categoryId: 1,
  ruleBeneficiaryStatus: { id: 1, title: "نمونه", name: "نمونه", value: "1" },
  beneficiarySupport: null,
  isSupplier: true,
}],
  countConnectedContract: 10,
};
