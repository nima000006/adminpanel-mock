//! APIs
export type FieldDatas = {
  filename: null;
  url: string;
  id: number;
};

export type DormType = {
  id: number;
  name: string;
};

export type DormPolicyType = {
  id: number;
  planid: number;
  fromdate: null;
  isactive: true;
  createdDate: null;
  modifiedDate: null;
  persentfee: number;
  dayscountforpayment: null;
  todate: null;
  dudays: number;
  des: string;
  ownerid: number;
  ownertype: number;
  rezervetype: number;
};

export type DormInformationData = {
  id: number;
  name: string;
  address: string;
  fromprice: string;
  toprice: string;
  rules: string;
  about: string;
  lat: string;
  lng: string;
  policy: string;
  copacity: number;
  score: string;
  phone: string;
  postalcode: null;
  active: true;
  show: true;
  typeofrezerve: string;
  filedatas: {
    filename: null;
    url: string;
    id: number;
  }[];
  dormitoryPolicyCount: 1;
  dormitoryPolicies: [
    DormPolicyType,
    DormPolicyType | undefined,
    DormPolicyType | undefined,
  ];
  roomFacilitiesResponses: [];
  type: [
    {
      id: number;
      name: string;
    },
  ];
  b_id: number;
  b_Name: string;
  branches: [
    {
      id: number;
      name: string;
      province: string;
      branchCode: string;
    },
  ];
};

export type GetDormInformationResponse = {
  status: number;
  msg: string;
  data: DormInformationData;
};
