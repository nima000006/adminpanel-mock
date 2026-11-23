//!API
export type CommitteeReport = {
  nationalCode: string;
  reporterPost: number;
  AssociationViolationStatus_title: string;
  userId: number;
  reporterName: string;
  reporterFamily: string;
  reporterUni: string;
  caregiverCode: string;
  AssociationRequestType_title: string;
  reporterNationalcode: string;
  eventReport: string;
  id: number;
  createDate: string;
  countReport: number;
};
export type GetCommitteeReportResponse = {
  data: CommitteeReport[];
  msg: string;
  status: number;
};
export type GetCommitteeReportRequest = {
  firstResult: number;
  maxResults: number;
  sortBy?: string;
  sortOrder?: string;
  type: string;
};
export type GetRoomListCountRequests = {
  floorid_EQ?: number;
  tarefe_EQ?: number;
};

export type CountResponse = {
  data: number;
  msg: string;
  status: number;
};
export type GetPricingStepCountRequest = {
  priceListId_EQ: number;
};
