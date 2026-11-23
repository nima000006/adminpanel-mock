import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";
import { GeneralResponse } from "@pages/Business/UsersList/@types/@usersList";

export type acceptRequestByMangerRequest = {
  roomid: number;
  reqid: number;
  discount: number;
  description: string;
  adminUsername?: string;
  discountAmount: number;
};
export type acceptRequestByMangerResponse = {
  status: number;
  msg: string;
  data: boolean;
};
export type RejectPendingUserResponse = {
  status: number;
  msg: string;
  data: boolean;
};

export type DormAddPropertySectionRequest = {
  DormitoryId: number;
  ManagementTypeId: number;
  RezervTypeId: number;
  LevelTypeId: number;
  DormitoryTypeOfAccommentationId: number;
};
export type DormAddPropertySectionResponse = {
  status: number;
  msg: string;
  data: {
    dormitoryId: number;
  };
};

export type GetFloorInformationResponse = {
  status: number;
  msg: string;
  data: {
    id: number;
    name: string;
    phone: string;
    des: string;
    isshow: boolean;
    isactive: boolean;
    modifiedDate: string;
    createdDate: string;
    b_id: number;
    about: string;
    policies: string;
    floorTypeOfAccommentationId: number;
    levelId: number;
    rezerveTypeId: number;
    managerTypeId: number;
  };
};
export type TransferUserWithoutExitRequest = {
  userName: string;
  roomId: number;
  requestId: number;
  adminUserName: string;
};

export type CreateDormitoryPlanRequest = {
  fromDate: string;
  toDate: string;
  isActicve: boolean;
  ownerId: number;
  ownerType: number;
};
export type dormitoryPolicyPayments = {
  planid: number;
  fromdate: string | null;
  persentfee: number;
  dayscountforpayment: number | null;
  todate: string;
  dudays: number;
  des: string | null;
  ownerid: number;
  ownertype: number;
  rezervetype: number;
};

export type SetDormitoryPolicyPaymentRequest = {
  dormitoryPolicyPayments: dormitoryPolicyPayments[];
};

export type ManualDormRegistrationResponse = {
  data: boolean;
  msg: string;
  status: number;
};
export type ManualDormRegistrationRequest = {
  username?: string;
  name?: string;
  lastName?: string;
  studentNumber?: string;
  dormitoryId: number;
  adminUsername?: string;
  mobile?: string;
  gender?: number;
  branchCode?: number;
  term: number;
  levelName?: string;
  fieldName?: string;
  userStaffId: number;
};

export type ManualRevertRequestResponse = GENERAL_RESPONSE<{
  data: boolean;
}>;

export type BulkRevertRequestResponse = GeneralResponse<{
  data: boolean;
}>;
export type BulkRevertRequestRequest = {
  requestIds: number[] | React.Key[];
  adminUsername: string;
  paymentDate: string;
  description: string;
  price: number;
};
export type GetAllPaidFactorDetailsOfRequestIdResponse = GENERAL_RESPONSE<{
  totalAutomatedPaidAmount: number;
  totalNotPaidAmount: number;
  totalManualPaidAmount: number;
  totalAmount: number;
}>;
export type ManualRevertRequestRequest = {
  requestId: number;
  adminUsername?: string;
  paymentDate: string;
  description: string;
  price: number;
};

export type FactorManualPaymentResponse = GENERAL_RESPONSE<boolean>;
export type FactorManualPaymentRequest = {
  factorId: number;
  isCancelled: boolean;
  adminUsername: string;
  description: string;
};
