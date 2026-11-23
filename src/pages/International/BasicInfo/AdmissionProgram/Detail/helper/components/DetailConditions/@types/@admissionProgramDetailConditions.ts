export type CoursePrerequisitesConditionsType = {
  fieldId: number;
  fieldTitle: string;
  degreeId: number;
  degreeTitle: string;
};

export type GetInternationalAdmissionDetailConditionInfoResponse = {
  interview: boolean;
  faCertificate: boolean;
  haveMinGPU: boolean;
  minGPU: null | number;
  haveMaxEntrance: boolean;
  maxEntrance: null | number;
  haveMaxSameFieldReq: boolean;
  maxSameFieldsReq: null | number;
  haveMaxSameBranchReq: boolean;
  maxSameBranchReq: null | number;
  coursePrerequisites: CoursePrerequisitesConditionsType[];
  languageProficiency: string;
  languageProficiencyId: number;
  cv: boolean;
  sop: boolean;
};
