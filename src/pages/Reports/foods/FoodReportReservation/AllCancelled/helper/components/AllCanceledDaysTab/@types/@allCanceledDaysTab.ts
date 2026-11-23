//! LAYOUTs
export type AllCanceledDaysTabProps = {
  branchData: { id: number; title: string }[];
  branchDataLoading: boolean;
};

//! APIs
export type GetAllHolidaysListRequest = {
  pageNo: number;
  pageSize: number;
  branchId: string;
};

export type AllHolidaysListTypes = {
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

export type GetAllHolidaysListResponse = {
  status: number;
  msg: string;
  data: {
    totalElements: number;
    holidays: AllHolidaysListTypes[];
  };
  errors: null;
};
