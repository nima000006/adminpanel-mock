//! APIs
export type GetMyHolidaysListRequest = {
  pageNo: number;
  pageSize: number;
};

export type MyHolidaysListTypes = {
  id: number;
  branchCode: number;
  branchName: string;
  reserveDate: string;
  createdByUsername: null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createdDate: string;
  deleted: boolean;
  totalCancelledPlans: null;
};

export type GetMyHolidaysListResponse = {
  status: number;
  msg: string;
  data: {
    totalElements: number;
    holidays: MyHolidaysListTypes[];
  };
  errors: null;
};
