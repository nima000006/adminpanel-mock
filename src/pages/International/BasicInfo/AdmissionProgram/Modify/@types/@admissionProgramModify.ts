//!LAYOUT
export type SelectDataType = {
  label: string;
  title: string;
  value: string;
  key: number;
  item: {
    id: number;
    title: string;
    description: string;
  };
  code: number;
};

export type AdmissionProgramModifyStepsProps = {
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
};

export type GetInternationalDegreesResponse = {
  id: number;
  title: string;
  description: string;
}[];

//todo[Atefeh]: edit response when api got ready
export type CreateInternationalAdmissionResponse = string;

export type CreateInternationalAdmissionRequest = {
  allRegions: boolean;
  applicationEndDate: string;
  applicationStartDate: string;
  arDescription: string;
  arTitle: string;
  branchFields: number[];
  countryRegionIds: number[];
  currencyType: number;
  cv: boolean;
  displayEndDate: string;
  displayStartDate: string;
  duration: number;
  enDescription: string;
  enTitle: string;
  faCertificate: boolean;
  faDescription: string;
  faTitle: string;
  genderType: number;
  interview: boolean;
  iranianCitizenship: number;
  languageProficiency: string;
  maxEntrance: number;
  maxSameBranchReq: number;
  maxSameFieldsReq: number;
  minDegreesRequired: number[];
  minFieldsRequired: number[];
  minGPA: number;
  preRegistrationEndDate: string;
  preRegistrationStartDate: string;
  registrationEndDate: string;
  registrationStartDate: string;
  residence: number;
  semesterEndDate: string;
  semesterId: number;
  semesterStartDate: string;
  serviceRequests: [
    {
      dutyRate: number;
      financialRuleId: number;
      fixedDiscount: number;
      measureUnit: string;
      percentDiscount: number;
      serviceId: number;
      taxRate: number;
      unitPrice: number;
    },
  ];
  sop: boolean;
  totalDuty: number;
  totalFixedDiscount: number;
  totalTax: number;
  training: number;
  trainingType: number;
};
