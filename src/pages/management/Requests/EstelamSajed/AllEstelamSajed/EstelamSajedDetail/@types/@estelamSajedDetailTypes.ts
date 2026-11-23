type IdName = {
  id: number;
  name: string;
  title: string;
};

export type EstelamSajedDetailResponse = {
  id: number;
  accessRequestsStatus: IdName;
  employeeCode: string;
  branchName: string;
  organizationTitle: string;
  files: { url: string; id: number }[];
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
  modifierFirstname: string;
  modifierLastname: string;
  rejectReason: IdName;
  rejectReasonDescription?: string;
  waitingSeconds: number;
  modifyBy: string;
  positionTitle: string; // طبق صحبت با اقای جماعتی این کلید باید اضافه شود
};

export type EstelamSajedBannerResponse = {
  accepted: number;
  inProgress: number;
  rejected: number;
};
