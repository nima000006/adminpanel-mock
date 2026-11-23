import { ListOfDormResidents } from "@pages/Reports/dorms/DormsRequests/DormReportRequests/AllDormReportRequests/@types/@allDormReportRequests";

//! GENERAL
export type ListOfResidentUserType = {
  name: string;
  family: string;
  typerezerve: string;
  startdate: string;
  enddate: string;
  studentnumber: string;
  nationalnumber: string;
  dormitoryname: string;
  mobile: string;
  emergencysatatus: string;
  buildingname: string;
  floorname: string;
  paymentstat: string;
  amount: string;
  roomname: string;
  prmission: boolean;
  totalUnPayment: null;
  totalPayment: null;
  //! newly added type
  dormitoryId: number;
  branchCode: string;
  paymentDate: null;
  requestId: number;
  adminUsername: null;
  trackNo: number;
  refrenceNo: number;
  description: string;
  manual: string;
  manualPayment: string;
};

//! LAYOUT
export type MovingModalRequestType = {
  id: number;
  isOpen: boolean;
  userInfo: Partial<ListOfDormResidents>;
};
