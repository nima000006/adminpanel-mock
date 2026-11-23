import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type RequestRoleDrawerContentProps = {
  closeDrawerHandler: () => void;
};

export type SubmitRequestRoleFirstStepRequest = {
  id?: number;
  employeeCode: string;
  branchId: number;
  organizationTitle: string;
  positionTitle: string;
  description: string;
};

export type SubmitRequestRoleFirstStepResponse = {
  id: number;
  accessRequestsStatus: IdTitleName;
  employeeCode: string;
  branchName: string;
  files: string[];
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
  rejectReason: IdTitleName;
  rejectReasonDescription?: string;
  waitingSeconds: number;
  modifyBy: string;
  organizationTitle: string;
  positionTitle: string;
  branchId: number;
};

export type RequestRoleDrawerFormType = {
  personalCode: string;
  branch: SelectType<IdTitleName>;
  location: string;
  position: string;
  description: string;
};

export type SajedPositionRequestRecordType = {
  requestId: number;
  status: IdTitleName;
  createdDate: string;
  employeeCode: string;
  branchName: string;
  positionTitle: string;
};

export type GetSajedPositionRequestListResponse = SajedPositionRequestRecordType[];
