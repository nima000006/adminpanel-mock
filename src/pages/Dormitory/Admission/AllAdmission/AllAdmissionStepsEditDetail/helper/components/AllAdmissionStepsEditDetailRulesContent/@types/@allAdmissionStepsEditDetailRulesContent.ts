import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type AllAdmissionStepsEditDetailHandoverDocumentFormItem = {
  title: string;
};

export type AllAdmissionStepsEditDetailRuleCategoryKey =
  "financial" | "disciplinary" | "general" | "cancellation" | "installment";

export type AllAdmissionStepsEditDetailRuleSelectedFieldName =
  `${AllAdmissionStepsEditDetailRuleCategoryKey}SelectedRule`;

export type AllAdmissionStepsEditDetailRuleDescriptionFieldName =
  `${AllAdmissionStepsEditDetailRuleCategoryKey}Description`;

type AllAdmissionStepsEditDetailRuleSelectedFields = {
  [K in AllAdmissionStepsEditDetailRuleSelectedFieldName]?: SelectType<IdTitle> | string;
};

type AllAdmissionStepsEditDetailRuleDescriptionFields = {
  [K in AllAdmissionStepsEditDetailRuleDescriptionFieldName]?: string;
};

export type AllAdmissionStepsEditDetailRulesFormType = {
  admissionGender: SelectType<IdTitle>;
  agreementBranches: SelectType<IdTitle>[];
  agreementBusiness: SelectType<IdTitle>[];
  hasAdditionalRestrictions: boolean;
  userGroup?: SelectType<IdTitle>[];
  nationality?: SelectType<IdTitle>;
  educationLevels?: SelectType<IdTitle>[];
  majors?: SelectType<IdTitle>[];
  requiresHandoverDocuments: boolean;
  handoverDocuments?: AllAdmissionStepsEditDetailHandoverDocumentFormItem[];
  requiresRelativesInfo: boolean;
} & AllAdmissionStepsEditDetailRuleSelectedFields &
  AllAdmissionStepsEditDetailRuleDescriptionFields;
