export type AdmissionReturnedListFilterParamsType = {
  statusId_EQ: 4;
  branchId_IN: string;
  dormitoryId_IN: string;
  requestTypeId_IN: string;
  waitingTimeId:
    | {
        queryParam: string;
        value: string;
      }
    | undefined;
};
