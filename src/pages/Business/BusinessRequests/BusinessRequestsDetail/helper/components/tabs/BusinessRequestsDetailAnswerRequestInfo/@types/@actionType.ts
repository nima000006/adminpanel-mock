export type ActionType = "accept" | "reject" | "return";

export type AcceptBusinessRequestParams = {
  businessTempHistoryId: number;
};
export type AcceptBusinessRequestResponse = string;

export type rejectOrReturnBusinessRequestParams = {
  businessTempHistoryId: number;
  statusId: number;
};
export type rejectOrReturnBusinessResponse = number;
