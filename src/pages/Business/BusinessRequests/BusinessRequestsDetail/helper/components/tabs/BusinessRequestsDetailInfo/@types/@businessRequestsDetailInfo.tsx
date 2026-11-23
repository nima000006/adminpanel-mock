export type BusinessRequestSpecificationDetailsResponse = {
  requestType: string;
  requestId: number;
  requetsLocalDate: string;
  requetsLocalTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  statusId: number;
  statusTitle: string;
  firstName: string;
  lastName: string;
  businessTitle: string;
};
export type BusinessRequestSpecificationDetailsParams = {
  businessTempHistoryId: number;
};
