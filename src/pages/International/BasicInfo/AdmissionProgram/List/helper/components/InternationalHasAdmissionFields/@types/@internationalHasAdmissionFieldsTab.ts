type TitleId = {
  id: number;
  title: string;
};

// degree
export type GetInternationalDegreesByGroupIdResponse = TitleId[];

// field of study
export type GetAllFieldsWithDegreesAndGroupIdResponse = TitleId[];
export type GetAllFieldsWithDegreesAndGroupIdRequest = {
  degreeIds: string[];
  groupId: number;
};
export type GetAllFieldsWithDegreesResponse = {
  id: number;
  title: string;
  description: string;
}[];

// branch
export type GetBranchStudyGroupWithDegreesAndFieldsResponse = TitleId[];
export type GetBranchStudyGroupWithDegreesAndFieldsRequest = {
  degrees: number[];
  fields: number[];
  studyGroupId: number;
};

// list
export type GetAllCoursesByAdvanceFilterRequest = {
  branchIds: number[];
  countryRegionIds?: number[];
  degreeIds: number[];
  fieldId: number[];
  groupId: number;
  pageNumber: number;
  pageSize: number;
  provinceRegionIds?: number[];
  semesters?: number[];
};

export type AllCoursesByAdvanceFilterTypes = {
  courseId: number;
  filedTitle: string;
  degreeTitle: string;
  branchTitle: string;
  ruleTitle: string;
  semesterTitle: string;
  residenceTitle: string;
  trainingTitle: string;
  trainingTypeTitle: string;
  genderTypeTitle: string;
  regionsCount: number;
  interview: boolean;
  farsiProficiency: boolean;
  cv: boolean;
  sop: boolean;
  ruleId: number;
  residenceId: number;
  trainingId: number;
  trainingTypeId: number;
  genderTypeId: number;
};

export type GetAllCoursesByAdvanceFilterResponse = {
  content: AllCoursesByAdvanceFilterTypes[][];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

type SelectType = {
  key: string;
  value: string;
  children: string;
  name: string;
  code: number;
  item: {
    id: number;
    title: string;
  };
};

export type HasAdmissionFieldsSearchFormType = {
  fieldGroup: SelectType;
  degree: SelectType;
  fieldOfStudy: SelectType;
  branch: SelectType[];
};
