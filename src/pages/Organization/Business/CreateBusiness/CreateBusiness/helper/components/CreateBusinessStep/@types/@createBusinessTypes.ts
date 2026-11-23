export type CreateBusinessStepProps = {
  nextStep: () => void;
};

type SelectType = {
  key: string;
  value: string;
  title: string;
  name: string;
  code: number;
  item: {
    id: number;
    title: string;
  };
};

export type CreateBusinessStepFormType = {
  genuineTaxType?: SelectType;
  genuineIbanCode?: string;
  genuineTaxTracking?: string;
  licenseCode: string;
  businessGenuineName?: string;
  genuineBrandName?: string;
  description: string;
  birthdate?: string;
  personalityGroupType?: SelectType;
  ibanCodeLegal?: string;
  taxTrackingCode?: string;
  businessLegalName?: string;
  legalBrandName?: string;
  nationalId?: string;
  legalTaxType?: SelectType;
  registerId: string;
};
