//! GENERAL
export type UpdateDormFactorFormProps = {
  debit: number;
  credit: number;
  discount: number;
  description: string;
};

//! APIs
export type DormFactorList = {
  id: number;
  paymentdate: string;
  ispay: boolean;
  username: string;
  roomid: number;
  roomName: string;
  floorId: number;
  floorName: string;
  buildngId: string;
  buildingName: string;
  dormitoryId: number;
  dormitoryName: string;
  status: boolean;
  requestStatus: number;
  amount: number;
  createdDate: string;
  modifiedDate: string;
  policyid: number;
  requstid: number;
  term: number;
  todate: string;
  isValid: boolean;
  studentNumber: string;
  name: string;
  family: string;
};

export type GetDormFactorListResponse = {
  status: number;
  msg: string;
  count: number;
  curenttherm: null;
  totalCount: number;
  data: DormFactorList[];
};

export type GetDormFactorListRequest = {
  dormitoryId: number;
};

export type DormUpdateFactorResponse = {
  data: boolean;
  msg: string;
  status: number;
};

export type DormUpdateFactorRequest = {
  adminUsername?: string;
  description: string;
  debtAmount: number;
  receivableAmount: number;
  discount: number;
  factorId: number;
};

//! LAYOUT
export type UpdateFactorModalType = {
  isOpen: boolean;
  info: Partial<DormFactorList>;
};

export type DisableFactorModalType = {
  isOpen: boolean;
  info: Partial<DormFactorList>;
};

export type CancelFactorModalType = {
  isOpen: boolean;
  info: Partial<DormFactorList>;
};

export type CancelDormitoryFactorResponse = {
  status: number;
  msg: string;
  data: boolean;
};

export type CancelDormitoryFactorRequest = {
  adminUsername: string;
  description: string;
  factorId: number;
};
