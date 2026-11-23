import { GENERAL_RESPONSE } from "@infra/models/modules/GeneralTypes/GeneralTypes";

export type CancelRequestsType = {
  id: number;
  basketPlansQuantity: number;
  basketPlansPlanReserveDate: string;
  basketPlansPlanMealId: number;
  basketPlansPlanMealName: string;
  basketPlansPlanProductContractRestaurantOwnerBranchCodeBranchCode: number;
  basketPlansPlanProductContractRestaurantOwnerBranchCodeBranchName: string;
  basketPlansPlanProductContractRestaurantTitle: string;
  basketPlansPlanProductTitle: string;
  basketPlansAmount: null;
  basketUserName: string;
  basketFirstName: string;
  basketLastName: string;
  basketStudentNumber: string;
  userDescription: null;
  adminUsername: null;
  createdDate: string;
  modifiedDate: null;
  adminDescription: null;
  status: number;
  cardNumber: string;
  basketPlansPlanRequestType: number;
  basketPlansPlanRequestTitle: string;
  bankName: null;
  bankAccountOwner: null;
  iban: string;
  basketPlansId: number;
};
export type GetPendingReturnedMoneyListResponse = GENERAL_RESPONSE<{
  cancelRequests: CancelRequestsType[];
  totalElements: number;
}>;
export type GetPendingReturnedMoneyListRequest = {
  branchCode: number | null;
  status: number;
  pageNo: string;
  pageSize: string;
};
