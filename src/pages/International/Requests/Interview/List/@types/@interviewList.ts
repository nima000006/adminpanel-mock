//! API
export type AllActiveSemestersType = {
  id: number;
  title: string;
  description: string;
};
export type GetAllActiveSemestersResponse = AllActiveSemestersType[];

export type InterviewListType = {
  id: number;
  interviewDate?: string;
  lastRequestChangeDate?: string;
  interviewers: [string];
  firstName: string;
  lastName: string;
  gender?: string;
  branchCode?: number;
  region?: string;
  passportNumber?: number;
  requestId: number;
  requestField: string;
  requestDegree: string;
  requestSemester: string;
  score?: number;
  status: number;
};

export type GetInterviewListByStatusResponse = {
  content: [InterviewListType[]];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetInterviewListByStatusRequest = {
  daysBeforeInterview?: number;
  interviewDate?: string | null;
  from?: string | null;
  pageNo: number;
  pageSize: number;
  semesterId: number;
  status: number;
  to?: string | null;
};
