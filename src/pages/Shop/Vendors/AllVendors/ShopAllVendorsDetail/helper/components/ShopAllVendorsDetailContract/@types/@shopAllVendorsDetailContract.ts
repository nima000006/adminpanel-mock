import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type ShopAllVendorsDetailContractData = {
  contractTemplate: string;
  services: string;
  contractStartDate: string;
  contractEndDate: string;
  beneficiaryBusiness: string;
  beneficiaryBranch: string;
};

export type ShopAllVendorsDetailContractDrawerMode = "add" | "change";

//! APIs
export type GetVendorContractListRequest = {
  supplierUuid: string;
};

export type GetVendorContractListBeneficiaryType = {
  uuid: string;
  beneficiaryType: {
    id: number;
    name: string;
    title: string;
  };
  username: string;
  businessId: number;
  businessName: string;
  branchId: number;
  branchTitle: string;
  partitionCoefficient: number;
  partitionCoefficientType: {
    id: number;
    name: string;
    title: string;
  };
};

export type GetVendorContractListResponse = {
  uuid: string;
  supplierUuid: string;
  supplierRuleBeneficiaryId: number;
  status: {
    id: number;
    name: string;
    title: string;
  };
  activatedDate: string;
  deactivatedDate: string;
  beneficiaries: GetVendorContractListBeneficiaryType[];
};

export type CreateAndChangeVendorContractBeneficiaryType = {
  ruleBeneficiaryId: number;
  branchId: number | null;
};

export type CreateAndChangeVendorContractRequest = {
  uuid: string;
  startDate: string;
  endDate: string | null;
  supplierTemplateId: number;
  beneficiaries: CreateAndChangeVendorContractBeneficiaryType[];
};

export type CreateAndChangeVendorContractResponse = GetVendorContractListResponse;

export type ShopAllVendorsDetailContractDrawerContentProps = {
  mode: ShopAllVendorsDetailContractDrawerMode;
  onCloseDrawer: () => void;
  onSubmit: () => void;
};

export type ShopAllVendorsDetailContractDrawerFormType = {
  contractDateRange: [string, string | null];
  templateId: string;
  serviceIds: string[];
  category?: SelectType<IdTitle>;
};

export type ShopAllVendorsDetailContractBeneficiary = {
  id: string;
  business: string | null;
  branch: string | null;
  isSeller: boolean;
  sharePercent: number;
};

/** Editable beneficiaries list kept in drawer (sent later with drawer submit) */
export type ShopVendorContractBeneficiaryListItem = {
  id: number;
  businessId: number | null;
  businessName: string | null;
  branchId: number | null;
  branchName: string | null;
  partitionCoefficient: number;
  supplier: boolean;
};

export type ShopAllVendorsDetailContractTemplateOption = {
  id: string;
  title: string;
  service: {
    id: string;
    title: string;
  };
  beneficiaries: ShopAllVendorsDetailContractBeneficiary[];
};

export type GetContractTemplateRequest = {
  service: string;
  pageSize: number;
  pageNumber: number;
};

export type GetContractTemplateItemType = {
  id: number;
  title: string;
  serviceCount: number;
  startDate: string;
  endDate: string | null;
};

export type GetContractTemplateResponse = {
  content: GetContractTemplateItemType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetServiceAndBeneficiaryTemplateRequest = {
  contractId: number;
};

export type GetServiceAndBeneficiaryTemplateBeneficiaryType = {
  id: number;
  businessId: number;
  businessName: string;
  branchId: number;
  branchName: string;
  branchType: {
    id: number;
    name: string;
    title: string;
  };
  personalityType: {
    id: number;
    name: string;
    title: string;
  };
  beneficiaryRuleType: {
    id: number;
    name: string;
    title: string;
  };
  partitionCoefficientType: {
    id: number;
    name: string;
    title: string;
  };
  partitionCoefficient: number;
  supplier: boolean;
  beneficiarySupport: number;
};

export type GetServiceAndBeneficiaryTemplateCategoryType = {
  categoryId: number;
  categoryName: string;
  beneficiaries: GetServiceAndBeneficiaryTemplateBeneficiaryType[];
};

export type GetServiceAndBeneficiaryTemplateResponse =
  GetServiceAndBeneficiaryTemplateCategoryType[];
