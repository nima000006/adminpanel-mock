import { IdTitle, IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

type GeneralData = {
  id: number;
  type: string;
  clause: string;
  title: string;
  isDefault: boolean;
  systematic: boolean;
  createdDate: string;
  modifiedDate: string;
  createdBy: string;
  modifiedBy: string;
};

export type BeneficiariesItems = {
  id: number;
  beneficiary: string;
  business: string;
  branchId: number;
  branchName: string;
  supportId: number;
  supportTitle: string;
  businessType: IdTitleName;
  branchType: string;
  partitionCoefficient: number;
  partitionCoefficientType: string;
  ecosystemTitle: string;
  service: IdTitleName;
  beneficiaryRuleType: IdTitleName;
  beneficiarySupport: IdTitleName;
  status: IdTitleName;
  supplier: boolean;
};

export type BeneficiaryBannerItem = {
  categoryTitle: string;
  supplierName: string;
  template: number;
  ruleBeneficiaries: number;
  hasTax: boolean;
  indexNumber: number;
  ruleBeneficiaryStatus: IdTitleName;
  categoryId: number;
  beneficiarySupport: IdTitle;
  isSupplier: boolean;
};

export type GetContractTemplateDetailResponse = {
  id: number;
  contractUuid: string;
  createdBy: string;
  createdDate: string;
  countConnectedContract: number;
  ecosystem: IdTitle;
  partitionCoefficientTypes: IdTitleName[];
  samimService: IdTitleName;
  categories: [
    {
      id: number;
      productType: IdTitleName;
      selectable: boolean;
      salable: boolean;
      hasTax: boolean;
      hasFee: boolean;
      samimService: IdTitleName;
    },
  ];
  startDate: string;
  endDate: string;
  parties: [
    {
      id: number;
      title: string;
      personalityGroupType: IdTitleName;
    },
  ];
  title: string;
  subject: string;
  commitments: GeneralData;
  guarantees: GeneralData;
  liquidatedDamages: GeneralData;
  disputedResolution: GeneralData;
  accountingSettlementConditions: GeneralData;
  terminationConditions: GeneralData;
  other: GeneralData[];
  files: [
    {
      id: number;
      name: string;
      fileName: string;
      url: string;
    },
  ];
  beneficiaries: BeneficiariesItems[];
  beneficiaryBanner: BeneficiaryBannerItem[];
  status: IdTitleName;
};
