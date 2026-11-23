import { ListOfDormResidents } from "@pages/Reports/dorms/DormsRequests/DormReportRequests/AllDormReportRequests/@types/@allDormReportRequests";

//!GENERAL
export type RoomActiveUserType = {
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
  mnaualPayment: string;
  manualPayment: string;
  payemntType: number;
  description: string;
  saman: string;
};

//! LAYOUT
export type AssignModalType = {
  isOpen: boolean;
  key: number;
  id: number;
  userData: Partial<ListOfDormResidents>;
};
