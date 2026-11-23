type SelectTypes = {
  label: string;
  value: string;
  key: number;
  code: number;
  children: string;
  item: {
    id: number;
    title: string;
  };
};

export type UseRequestsListPendingAdvanceFilterFormType = {
  listPendingRequestType: SelectTypes[] | [];
  listPendingGender: SelectTypes[] | [];
  listPendingUserGroup: SelectTypes[] | [];
  listPendingScheduling: SelectTypes[] | [];
  listPendingProvince: SelectTypes[] | [];
  listPendingCity: SelectTypes[] | [];
  listPendingUni: SelectTypes[] | [];
  listPendingReservationType: SelectTypes[] | [];
  listPendingDormitory: SelectTypes[] | [];
  listPendingWaitingTime: SelectTypes | undefined;
};

export type UseRequestsListPendingParamsType = {
  listPendingRequestTypeId?: string;
  listPendingGenderId?: string;
  listPendingUserGroupId?: string;
  listPendingSchedulingId?: string;
  listPendingProvinceId?: string;
  listPendingCityId?: string;
  listPendingUniId?: string;
  listPendingReservationTypeId?: string;
  listPendingWaitingTimeId?: string;
  listPendingDormitoryId?: string;
};
