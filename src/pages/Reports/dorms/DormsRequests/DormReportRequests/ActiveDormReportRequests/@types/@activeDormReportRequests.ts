//! APIs
export type RequestActiveDormitory = {
  id: number;
  key: number;
  name: string;
  family: string;
  jender: string;
  nationalcode: string;
  mobile: string;
  dormitoryname: string;
  dormitorytype: string;
  dormitoryid: number;
  requesttype: string;
  score: string;
  requestdate: string;
  studntNumber: string;
  status: number;
  branchCode: string;
  manual: string;
  refrenceNo: number;
  trackNo: number;
  adminUsername: null;
  modifiedDate: null;
  paymentDate: null;
  manualPayment: string;
  payemntType: number;
  description: string;
  //
  active: boolean;
  term: number;
  roomTitle: string;
  buildingTitle: string;
  floorTitle: string;
  fieldName: string;
  levelName: string;
};

export type ListOfRequestDormitoryResponse = {
  count: number;
  curenttherm: null;
  data: RequestActiveDormitory[];
  msg: string;
  status: number;
  totalCount: number;
};

export type ActiveDormReportRequestsTableData = RequestActiveDormitory;
