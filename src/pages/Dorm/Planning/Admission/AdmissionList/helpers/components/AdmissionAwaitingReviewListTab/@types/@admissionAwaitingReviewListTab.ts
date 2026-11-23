export type AdmissionPendingReviewListFilterParamsType = {
  statusId_EQ: 1;
  branchId_IN: string;
  dormitoryId_IN: string;
  requestTypeId_IN: string;
  reservationTypeId_IN: string;
  waitingTimeId:
    | {
        queryParam: string;
        value: string;
      }
    | undefined;
};
