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

export type UseRequestsAllAdvanceFilterFormType = {
  allRequestType: SelectTypes[] | [];
  allGender: SelectTypes[] | [];
  allUserGroup: SelectTypes[] | [];
  allScheduling: SelectTypes[] | [];
  allProvince: SelectTypes[] | [];
  allCity: SelectTypes[] | [];
  allUni: SelectTypes[] | [];
  allDormitory: SelectTypes[] | [];
  allReservationType: SelectTypes[] | [];
  allWaitingTime: SelectTypes | undefined;
};

export type UseRequestsAllParamsType = {
  allRequestTypeId?: string;
  allGenderId?: string;
  allUserGroupId?: string;
  allSchedulingId?: string;
  allProvinceId?: string;
  allCityId?: string;
  allUniId?: string;
  allDormitoryId?: string;
  allReservationTypeId?: string;
  allWaitingTimeId?: string;
};
