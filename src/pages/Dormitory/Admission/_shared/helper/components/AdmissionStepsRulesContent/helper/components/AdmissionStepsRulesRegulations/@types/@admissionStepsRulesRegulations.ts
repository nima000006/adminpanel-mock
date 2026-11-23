import { FormInstance } from "antd";

import { AdmissionStepsRulesFormType } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/@types/@admissionStepsRulesContent";
import { GetAllAdmissionRulesResponse } from "@pages/Dormitory/Admission/_shared/helper/components/AdmissionStepsRulesContent/helper/components/AdmissionStepsRulesAdmissionConditions/@types/@admissionStepsRulesAdmissionConditions";

export type GetDormitoryRegulationTemplateListRequest = {
  pageSize: number;
  pageNumber: number;
  title?: string;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
  accommodationType?: string;
  kind?: string;
};

export type GetDormitoryRegulationTemplateListContent = {
  uuid: string;
  title: string;
};

export type GetDormitoryRegulationTemplateListResponse = {
  content: GetDormitoryRegulationTemplateListContent[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type AdmissionStepsRulesRegulationsProps = {
  form: FormInstance<AdmissionStepsRulesFormType>;
  data: GetAllAdmissionRulesResponse | undefined;
};
