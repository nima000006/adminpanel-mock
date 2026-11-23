import { IdTitle, IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type NewContractCategoryListContractCategory = {
  categoryId: number;
  contractId: number;
  key: string;
  name: string;
  beneficiaryCounts: number;
  percentage: number;
  hasTax?: boolean;
};

export type NewContractCategoryListResponse = {
  completed: boolean;
  summaryDtoList: [
    {
      size: number;
      totalSize: number;
      title: string;
      categoryAssignmentStatus: string;
      contractCategories: NewContractCategoryListContractCategory[];
    },
  ];
};

export type NewContractCategoryListRequest = {
  contractId: number;
};

export type newContractLookupItem = IdTitleName;

export type addNewContractBeneficiaryRequest = {
  contractId: number;
  categoryId: number;
  body: {
    ruleType: string;
    partitionCoefficientType: string;
    partitionCoefficient: number;
    beneficiarySupportId: number;
    isSupplier?: boolean;
    username?: string;
    nationalCode?: string;
    businessId?: number;
    branchType?: string;
    branchId?: number;
  };
};

export type editNewContractBeneficiaryRequest = {
  ruleBeneficiaryId: number;
  body: {
    ruleType: string;
    partitionCoefficientType: string;
    partitionCoefficient: number;
    beneficiarySupportId: number;
    isSupplier?: boolean;
    username?: string;
    nationalCode?: string;
    businessId?: number;
    branchType?: string;
    branchId?: number;
  };
};

export type getAllPartitionCoefficientTypeByContractIdResponse = IdTitleName[];

export type getAllPartitionCoefficientTypeByContractIdRequest = {
  contractId: number;
};

export type getAllBeneficiarySupportResponse = IdTitle[];

export type getContractBranchTypeRequest = {
  businessId: number;
};
export type getContractBranchTypeResponse = IdTitleName[];

export type getContractBranchIdRequest = {
  businessId: number;
  type: "CENTRAL" | "PROVINCIAL_CENTRAL" | "ORDINARY" | "SYSTEMIC" | "TAX" | string;
};
export type getContractBranchIdResponse = IdTitle[];

export type addNewContractBeneficiaryOptionTypes =
  | "PERSONAL_DETERMINED"
  | "LEGAL_DETERMINED"
  | "LEGAL_UNDETERMINED"
  | "GROUPING"
  | "PERSONAL_UNDETERMINED";

export type addContractConfirmRequest = {
  contractId: number;
};

export type deleteBeneficiaryConfirmRequest = {
  id: number;
};
export type FinancialRuleFormValues = {
  business?: string;
  branchType?: string;
  branch?: string;
  user?: string;
  // CustomCheckboxGroup returns an array: [true] when checked, [] when unchecked
  isSupplier?: boolean | boolean[];
  shareHolderService?: string;
  calculationMethod?: string;
  partitionCoefficient?: number;
};
