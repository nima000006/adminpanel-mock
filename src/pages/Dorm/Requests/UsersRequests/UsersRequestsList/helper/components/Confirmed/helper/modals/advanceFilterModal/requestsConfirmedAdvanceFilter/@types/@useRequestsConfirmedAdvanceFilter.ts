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

export type UseRequestsConfirmedAdvanceFilterFormType = {
  confirmedRequestType: SelectTypes[] | [];
  confirmedGender: SelectTypes[] | [];
  confirmedUserGroup: SelectTypes[] | [];
  confirmedScheduling: SelectTypes[] | [];
  confirmedProvince: SelectTypes[] | [];
  confirmedCity: SelectTypes[] | [];
  confirmedUni: SelectTypes[] | [];
  confirmedDormitory: SelectTypes[] | [];
  confirmedReservationType: SelectTypes[] | [];
  confirmedWaitingTime: SelectTypes | undefined;
};

export type UseRequestsConfirmedParamsType = {
  confirmedRequestTypeId?: string;
  confirmedGenderId?: string;
  confirmedUserGroupId?: string;
  confirmedSchedulingId?: string;
  confirmedProvinceId?: string;
  confirmedCityId?: string;
  confirmedUniId?: string;
  confirmedReservationTypeId?: string;
  confirmedDormitoryId?: string;
  confirmedWaitingTimeId?: string;
};
