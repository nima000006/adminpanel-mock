//! LAYOUTs
type SelectTypes = {
  label: string;
  value: string;
  key: number;
  code: number;
  children: string;
  item: {
    id: number;
    title: string;
  };
};

export type UseEstelamMyAmozeshyarAdvanceFilterFormType = {
  branch: SelectTypes;
  date: string[];
};

//! APIs
export type EstelamMyAmozeshyarListItemType = {
  id: number;
  accessRequestsStatus: string;
  studentNumber: string;
  branchName: string;
  facultyName: string;
  degreeTitle: string;
  studyField: string;
  levelName: string;
  entranceYear: string;
  entranceSemester: string;
  fileUrl: string;
  description: string;
  user: {
    id: number;
    firstName: string;
    enFirstName: string;
    lastName: string;
    enLastName: string;
    username: string;
    mobileNumber: string;
    regionId: number;
    region: string;
    email: string;
    createdDateTime: string;
  };
  createdDate: string;
  modifiedDate: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  username: string;
  modifierFirstname: string;
  modifierLastname: string;
};

export type EstelamMyAmozeshyarListResponse = {
  content: EstelamMyAmozeshyarListItemType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type EstelamMyAmozeshyarListRequest = {
  params: {
    pageNo: number;
    pageSize: number;
  };
  status: number;
};

export type GetMyAmozeshyarListAdvanceFilterRequest = {
  statusId: number;
  username?: string;
  mobileNumber?: string;
  studentNumber?: string;
  branchId?: number;
  requestDateFrom?: string;
  requestDateTo?: string;
  pageNumber: number;
  pageSize: number;
  firstname?: string;
  lastname?: string;
  //Todo[Atefeh]: با صحبت با اقای جماعتی این ایتم ها فعلا نادیده گرفته شد.
  // entranceSemester: 2;
  // entranceYear: "2025-09-08";
  // universityUnitId: 0;
  // levelId: 0;
  // fieldId: 0;
};

export type EstelamMyAmozeshyarByAdvanceFilterRequest = {
  username?: string;
  mobileNumber?: string;
  studentNumber?: string;
  branchId?: number;
  requestDateFrom?: string;
  requestDateTo?: string;
  firstname?: string;
  lastname?: string;
};
