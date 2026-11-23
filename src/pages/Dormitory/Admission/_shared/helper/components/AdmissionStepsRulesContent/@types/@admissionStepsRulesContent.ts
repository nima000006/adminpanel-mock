import { Dispatch, SetStateAction } from "react";

import { FormInstance, UploadFile } from "antd";

import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type AdmissionStepsRulesHandoverDocumentFormItem = {
  title: string;
};

export type AdmissionStepsRuleCategoryKey =
  "FINANCIAL" | "DISCIPLINARY" | "GENERAL" | "CANCELLATION" | "INSTALLMENT";

export type AdmissionStepsRuleDescriptionFieldName =
  `${AdmissionStepsRuleCategoryKey}Description`;

type AdmissionStepsRuleSelectedFields = {
  [K in AdmissionStepsRuleCategoryKey]?: SelectType<IdTitle>;
};

type AdmissionStepsRuleDescriptionFields = {
  [K in AdmissionStepsRuleDescriptionFieldName]?: string;
};

export type AdmissionStepsRulesFormType = {
  admissionGender?: SelectType<IdTitleName>;
  hasShowRestrictions: boolean;
  businessTypes?: SelectType<IdTitle>[];
  branches?: SelectType<IdTitle>[];
  hasAdditionalRestrictions: boolean;
  hasAdditionalRestrictionsUserGroup?: SelectType<IdTitleName>;
  hasAdditionalRestrictionsNationality?: SelectType<IdTitleName>;
  hasAdditionalRestrictionsEducationLevels?: SelectType<IdTitleName>[];
  hasAdditionalRestrictionsMajors?: SelectType<IdTitleName>[];
  //تا اینجا درست شده تایپ ها
  userGroup?: SelectType<IdTitle>[];
  nationality?: SelectType<IdTitle>;
  educationLevels?: SelectType<IdTitle>[];
  majors?: SelectType<IdTitle>[];
  requiresHandoverDocuments?: boolean;
  handoverDocuments?: AdmissionStepsRulesHandoverDocumentFormItem[];
  requiresRelativesInfo?: boolean;
} & AdmissionStepsRuleSelectedFields &
  AdmissionStepsRuleDescriptionFields;

export type AdmissionStepsRulesContentProps = {
  from?: "all" | "my";
  form: FormInstance<AdmissionStepsRulesFormType>;
  documentFileLists: UploadFile[][];
  setDocumentFileLists: Dispatch<SetStateAction<UploadFile[][]>>;
  reservableCapacity?: string;
  isSubmitAndContinueLoading?: boolean;
  onBack: () => void;
  onSaveDraft: () => void;
  onSubmitAndContinue: (values: AdmissionStepsRulesFormType) => void;
};
