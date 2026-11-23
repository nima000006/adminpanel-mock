// ! LAYOUT
type SelectDataType = {
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

export type BasicInfoForm = {
  admissionTitle: string;
  semester: SelectDataType;
  residence: SelectDataType;
  training: SelectDataType;
  gender: SelectDataType;
  regions: SelectDataType[];
  trainingType: SelectDataType;
};

//!APIs
type IdTitle = {
  title: string;
  id: number;
};

export type GetInternationalAllActiveSemestersResponse = {
  id: number;
  title: string;
  description: string;
}[];

export type GetInternationalAllCountriesResponse = {
  id: number;
  regionType: number;
  logo: string;
  countryCode: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
}[];

export type GetInternationalAllGenderResponse = IdTitle[];

export type GetInternationalAllResidencesResponse = IdTitle[];

export type GetInternationalAllTrainingResponse = IdTitle[];

export type GetInternationalAllTrainingTypesResponse = IdTitle[];

export type CreateInternationalAdmissionBasicInformationRequest = {
  faTitle: string;
  semesterId: number;
  residence: number;
  training: number;
  genderType: number;
  allRegions: boolean;
  trainingType: number;
  countryRegionIds?: number[];
  ruleId?: number;
};
