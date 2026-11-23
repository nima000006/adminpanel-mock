export type ManualRegisterStudentModalContentFormData = {
  dorm: {
    key: string;
    value: string;
    label: string;
    name: string;
    code: number;
    item: {
      id: number;
      title: string;
    };
  };
  searchmode: boolean;
  fieldNumber: string;
  term: {
    label: string;
    value: string;
    key: number;
    code: number;
    title: string;
    item: {
      id: number;
      title: string;
    };
  };
};

//! APIs
export type StudentListByUsernameAndStudentNumberContentType = {
  userResponseDto: {
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
  id: number;
  userStaffId: number;
  studentNumber: string;
  studyFieldId: null;
  studyFieldName: string;
  degreeId: null;
  degreeName: string;
  branchId: number;
  branchName: string;
  recordStatus: number;
  admissionYear: string;
  nationalCode: string;
  birthDate: string;
  manuallyCreated: boolean;
  admissionTermCode: null;
  admissionTermName: string;
  facultyName: string;
  createdDate: string;
  keyCloakId: string;
};

export type GetStudentListByUsernameAndStudentNumberResponse = {
  content: StudentListByUsernameAndStudentNumberContentType[];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetStudentListByUsernameAndStudentNumberRequest = {
  username?: string;
  studentNumber?: string;
  pageSize: number;
  pageNumber: number;
};
