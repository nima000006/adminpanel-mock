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

export type UseRequestsDeliveredAdvanceFilterFormType = {
  deliveredRequestType: SelectTypes[] | [];
  deliveredGender: SelectTypes[] | [];
  deliveredUserGroup: SelectTypes[] | [];
  deliveredScheduling: SelectTypes[] | [];
  deliveredProvince: SelectTypes[] | [];
  deliveredCity: SelectTypes[] | [];
  deliveredUni: SelectTypes[] | [];
  deliveredReservationType: SelectTypes[] | [];
  deliveredDormitory: SelectTypes[] | [];
};

export type UseRequestsDeliveredParamsType = {
  deliveredRequestTypeId?: string;
  deliveredGenderId?: string;
  deliveredUserGroupId?: string;
  deliveredSchedulingId?: string;
  deliveredProvinceId?: string;
  deliveredCityId?: string;
  deliveredUniId?: string;
  deliveredReservationTypeId?: string;
  deliveredDormitoryId?: string;
};
