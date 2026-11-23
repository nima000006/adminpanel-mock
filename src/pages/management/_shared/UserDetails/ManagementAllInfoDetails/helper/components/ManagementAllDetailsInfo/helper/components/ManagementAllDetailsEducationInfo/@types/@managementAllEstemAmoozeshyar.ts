//! LAYOUTs
export type UpdateStudentInfoFormType = {
  studentNumber: string;
  branch: {
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
  degree: string;
  faculty: string;
  field: string;
  entranceYear: any;
  entranceSemester: any;
};

//! APIs
export type ManagementAllEstemAmoozeshyarResponse = {
  fieldName: string;
  totalAverage: string;
  totalPassedUnits: string;
  levelName: string;
  lastName: string;
  firstName: string;
  nationalCode: string;
  studentNumber: string;
  email: string;
  fatherName: string;
  birthDate: string;
  enLastName: string;
  enFirstName: string;
  branchName: string;
  isActive: boolean;
  fieldCode: string;
  msrtLevelCode: string;
  termCode: string;
  termName: string;
  eduStartDate: string;
  genderCode: string;
  marriedCode: string;
  mobile: string;
  branchCode: string;
  eduStartCode: number;
  levelCode: string;
  genderName: string;
  marriedName: string;
  lastStateName: string;
};

export type ManagementAllUpdateStudentInfoRequest = {
  studentId: number;
  reqBody: {
    studentNumber: string;
    branchId: number;
    facultyName: string;
    degreeTitle: string;
    studyFieldName: string;
    // Todo[Atefeh]: uncomment when api got ready
    // levelName: string;
    entranceYear: string;
    entranceSemester: string;
  };
};
