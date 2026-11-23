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

export type UseRequestsCancelledAdvanceFilterFormType = {
  cancelledRequestType: SelectTypes[] | [];
  cancelledGender: SelectTypes[] | [];
  cancelledUserGroup: SelectTypes[] | [];
  cancelledScheduling: SelectTypes[] | [];
  cancelledProvince: SelectTypes[] | [];
  cancelledCity: SelectTypes[] | [];
  cancelledUni: SelectTypes[] | [];
  cancelledReservationType: SelectTypes[] | [];
  cancelledWaitingTime: SelectTypes | undefined;
  cancelledDormitory: SelectTypes[] | [];
};

export type UseRequestsCancelledParamsType = {
  cancelledRequestTypeId?: string;
  cancelledGenderId?: string;
  cancelledUserGroupId?: string;
  cancelledSchedulingId?: string;
  cancelledProvinceId?: string;
  cancelledCityId?: string;
  cancelledUniId?: string;
  cancelledReservationTypeId?: string;
  cancelledWaitingTimeId?: string;
  cancelledDormitoryId?: string;
};
