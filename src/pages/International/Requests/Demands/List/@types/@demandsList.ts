//! APIs
export type AllActiveSemestersType = {
  id: number;
  title: string;
  description: string;
};

export type GetAllActiveSemestersResponse = AllActiveSemestersType[];

export type DemandListByStatusAndSemesterType = {
  id: number;
  semesterEndDate: string;
  requestNumber: number;
  saorgCode: number;
  requestField: string;
  requestDegree: string;
  requestUnit: string;
  requestSemester: string;
  requestDate: string;
  enFirstName: string;
  enLastName: string;
  genderType: number;
  birthDate: string;
  nationality: number;
  citizenship: number;
  resident: number;
  passportNo: string;
  identificationNumber: string;
  lastDegree: string;
  lastField: string;
  lastModifiedDate: string;
  residenceRegion: string;
  issuingUnit: string;
  diplomaAverage: number;
  overallGPA: number;
};

export type GetDemandListByStatusAndSemesterResponse = {
  content: [DemandListByStatusAndSemesterType[]];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetDemandListByStatusAndSemesterRequest = {
  paginationRequest: {
    pageNo: number;
    pageSize: number;
  };
  semesterId: number;
  statusId: number;
};
