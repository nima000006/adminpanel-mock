export type myDoctorSurveyDetailFourthTabRequest = {
  params: {
    page: number;
    size: number;
    sort?: string[];
  };
  body: {
    branchIds?: number[];
    level?: string;
    degree?: string;
    groupStatusIds?: number[];
    fromDate?: string;
    toDate?: string;
    testRequestFromDate?: string;
    testRequestToDate?: string;
    surveyId?: number;
    testId?: number;
    testStatusId?: number;
    testTypeIds: number[];
    surveyCycleId?: number;
    username?: string;
    centerId?: number;
    firstName?: string;
    lastName?: string;
    cityIds?: number[];
    provinceIds?: number[];
  };
};

export type myDoctorSurveyDetailFourthTabContentType = {
  id: number; // remove this comment when backend will update the response
  otherTests: string[];
  firstName: string;
  lastName: string;
  username: string;
  mobileNumber: string;
  createdDate: string;
  modifiedDate: string;
  testStatus: {
    id: number;
    title: string;
    description: string;
    statusEmergencyType: string;
    statusEmergencyTypeId: number;
    imageUrl: string;
    statusType: string;
    statusTypeId: number;
    code: number;
  };
  centerTitle: string;
  testTitle: string;
  testId: number;
  files: string[];
  branchId: number;
  branchName: string;
  provinceTitle: string;
  cityTitle: string;
  paymentDate: string;
  surveyCycleCreatedDate: string;
  surveyCycleModifiedByFirstName: string;
  surveyCycleModifiedByLastName: string;
  surveyCycleModifiedByFullName?: string;
  surveyCycleModifiedByUsername: string;
  surveyCycleId: number;
  surveyId: number;
};
export type myDoctorSurveyDetailFourthTabResponse = {
  totalElements: number;
  isLast: boolean;
  content: myDoctorSurveyDetailFourthTabContentType[];
  totalPages: number;
};
