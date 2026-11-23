import { FormInstance } from "antd";

import { IdTitle, IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { AdmissionStepsRulesFormType } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/@types/@admissionStepsRulesContent";

export type DormitoryGenderListResponse = IdTitleName[];

export type DormitoryUserGroupListResponse = IdTitleName[];

export type DormitoryDegreeListResponse = IdTitleName[];

export type DormitoryCitizenListResponse = IdTitleName[];

export type GetBasicInformationStudyFieldsResponse = IdTitle[];

export type GetAllAdmissionRulesRequest = string;

export type GetMyAdmissionRulesRequest = string;

export type GetAllAdmissionRulesBusiness = {
  businessId: number;
  title: string;
};

export type GetAllAdmissionRulesBranch = {
  uuid: string;
  branchId: number;
  title: string;
};

export type GetAllAdmissionRulesStudyField = {
  uuid: string;
  studyFieldId: number;
  title: string;
};

export type GetAllAdmissionRulesForm = {
  uuid: string;
  title: string;
  url: string;
};

export type GetAllAdmissionRulesRegulation = {
  uuid: string;
  templateUuid: string;
  title: string;
  description: string;
  kind: IdTitleName;
};

export type GetAllAdmissionRulesResponse = {
  uuid: string;
  gender: IdTitleName;
  allowAllBranches: boolean;
  restrictEligibility: boolean;
  allowBusinesses: GetAllAdmissionRulesBusiness[];
  allowBranches: GetAllAdmissionRulesBranch[];
  userGroupTypes: IdTitleName[];
  academicDegrees: IdTitleName[];
  studyFields: GetAllAdmissionRulesStudyField[];
  allowCitizenShip: IdTitleName;
  needUploadForms: boolean;
  forms: GetAllAdmissionRulesForm[];
  allowGuestInfo: boolean;
  regulations: GetAllAdmissionRulesRegulation[];
};

export type GetMyAdmissionRulesResponse = GetAllAdmissionRulesResponse;

export type AdmissionStepsRulesAdmissionConditionsProps = {
  form: FormInstance<AdmissionStepsRulesFormType>;
  data: GetAllAdmissionRulesResponse | undefined;
};
