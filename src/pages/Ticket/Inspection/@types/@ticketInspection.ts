//! GENERAL
//! LAYOUT
//! API
export type GetTicketDetailResponse = {
  status: number;
  msg: string;
  ticketDetail: {
    id: number;
    title: string;
    imgname: string;
    problemname: string;
    createdate: string;
    status: number;
    servicename: string;
    messeages: {
      id: number;
      msg: string;
      date: string;
      typemsg: number;
      filedatas: {
        filename: string;
        url: string;
        id: number;
      }[];
    }[];
  };
};
export type AddMessageForUserTicketResponse = {
  status: number;
  msg: string;
  registerticket: null;
};
export type CloseTicketResponse = {
  status: number;
  msg: string;
  tikets: null;
};
