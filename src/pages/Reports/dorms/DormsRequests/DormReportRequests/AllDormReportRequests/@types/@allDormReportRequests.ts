//! APIs
export type ListOfDormResidents = {
  name: string;
  family: string;
  typerezerve: string;
  startdate: string;
  enddate: string;
  studentnumber: string;
  nationalnumber: string;
  dormitoryname: string;
  emergencysatatus: string;
  buildingname: string;
  floorname: string;
  id: number;
  key: number;
  paymentstat: string;
  amount: string;
  jender: string;
  payemntType: number;
  roomname: string;
  requestdate: string;
  prmission: boolean;
  totalUnPayment: null;
  totalPayment: null;
  dormitoryId: number;
  branchCode: string;
  mobile: string;
  paymentDate: null;
  dormitoryid: number;
  requestId: number;
  adminUsername: null;
  trackNo: number;
  refrenceNo: number;
  description: string;
  manual: string;
  manualPayment: string;
  paymentType: any; // number
  nationalcode: string;
  //
  dormitorytype: string;
  requesttype: string;
  score: string;
  studntNumber: string;
  status: number;
  modifiedDate: null;
  active: boolean;
  term: number;
  roomTitle: string;
  buildingTitle: string;
  floorTitle: string;
  fieldName: string;
  levelName: string;
};

export type GetListOfDormResidentsResponse = {
  status: number;
  msg: string;
  count: number;
  curenttherm: string;
  data: ListOfDormResidents[];
};
export type GetListOfDormResidentsRequest = {
  semester: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
  branchCode: string | null;
};
