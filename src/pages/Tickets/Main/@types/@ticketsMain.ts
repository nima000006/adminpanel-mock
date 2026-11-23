//! GENERAL
//! LAYOUT
//! API
export type TicketsListType = {
  id: number;
  key: number;
  title: string;
  imgname: string;
  createdate: string;
  time: string;
  status: number;
  servicename: string;
  typeOfProblem: string;
  studentnumber: string;
  branchCode: string;
  firstName: string;
  lastName: string;
  nationalCode: string;
  mobile: string;
};
export type GetTicketListResponse = {
  status: number;
  msg: string;
  tikets: TicketsListType[];
};
