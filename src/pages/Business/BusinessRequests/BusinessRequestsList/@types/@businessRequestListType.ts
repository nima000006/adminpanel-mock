export type GetAllBusinessRequestsParams = {
  pageNumber: number;
  pageSize: number;
};

export type BusinessRequestTable = {
  waitingDays: number;
  id: number;
  businessTempHistoryId: number;
  status: string;
  applicantNationalCode: string;
  applicantName: string;
  applicantMobileNumber: string;
  businessTitle: string;
  personalityType: string;
  requestDate: string;
  lastEditDate: string | null;
  lastEditUser: string | null;
  responsibleManager: string | null;
};
export type GetAllBusinessRequestsResponse = {
  content: BusinessRequestTable[][];
  pageNumber: number;
  pageSize: number;
  first?: boolean;
  last?: boolean;
  totalElements?: number;
  totalPages?: number;
  size?: number;
};
