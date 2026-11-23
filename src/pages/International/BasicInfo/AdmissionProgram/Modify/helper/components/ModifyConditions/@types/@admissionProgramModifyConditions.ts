//! LAYOUT
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
export type ConditionInfoForm = {
  interview: boolean;
  sop: boolean;
  cv: boolean;
  faCertificate: boolean;
  haveMinGPU: boolean;
  haveMaxEntrance: boolean;
  haveMaxSameFieldReq: boolean;
  haveMaxSameBranchReq: boolean;
  preDegrees: SelectType[];
  preFields: SelectType[];
  languageProficiency: SelectType;
  haveMaxEntranceInput?: string;
  haveMinGPUInput?: string;
  haveMaxSameFieldReqInput?: string;
  haveMaxSameBranchReqInput?: string;
};

//! APIs
export type GetInternationalAllLanguagesResponse = { title: string; id: number }[];

export type CreateInternationalAdmissionConditionsInformationRequest = {
  cv: boolean;
  faCertificate: boolean;
  id: number;
  interview: boolean;
  languageProficiency: number;
  maxEntrance: number | null;
  maxSameBranchReq: number | null;
  maxSameFieldsReq: number | null;
  minDegreesRequired: number[];
  minFieldsRequired: number[];
  minGPA: number | null;
  sop: boolean;
};
