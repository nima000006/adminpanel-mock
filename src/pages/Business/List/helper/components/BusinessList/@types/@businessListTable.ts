//! GENERAL
//! LAYOUT
//! API
export type GetListOfBusinessResponse = {
  status: number;
  msg: string;
  data: {
    id: number;
    key: number;
    title: string;
    email: string;
    type: string;
    mobile: string;
    nationalCode: string;
    userName: string;
  }[];
};
