export type GetInterviewDetailResponse = {
  interview: {
    id: number;
    interviewDate: string;
    interviewTime: string;
    score: number;
    link: string;
    interviewDurationTime: number;
    isActiveLink: boolean;
  };
  interviewMembers: {
    id: number;
    title: string;
    username: string;
  }[];
  interviewAdmins: {
    id: number;
    title: string;
    username: string;
  }[];
  intervieweeIdInfo: {
    firstName: string;
    lastName: string;
    genderType: string;
    nickname: string;
    birthDate: string;
    nationality: string;
    citizenship: string;
    residency: string;
    passportNumber: string;
    identificationNumber: string;
  };
  requestOfInterviewee: {
    degree: string;
    field: string;
    requestUniversity: string;
    semesterTitle: string;
    requestId: number;
    requestStatus: number;
  };
  preIntervieweeEducationalRecord: {
    degree: string;
    field: string;
    lastInstitution: string;
    countryReceivingDegree: string;
    diplomaAverage: number;
    gpa: number;
  };
  interviewStatus: null;
  timer: number | undefined;
  sActiveLink: boolean;
};
