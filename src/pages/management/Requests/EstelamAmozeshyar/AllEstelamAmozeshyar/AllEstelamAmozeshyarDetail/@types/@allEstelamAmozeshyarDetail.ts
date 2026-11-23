//! APIs
export type EstelamAmozeshyarDetailResponse = {
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
  rejectReason: {
    id: number;
    name: string;
    title: string;
  };
  rejectReasonDescription?: string;
};
