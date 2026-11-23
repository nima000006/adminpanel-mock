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

export type UseRequestsCancellationAdvanceFilterFormType = {
  cancellationRequestType: SelectTypes[] | [];
  cancellationGender: SelectTypes[] | [];
  cancellationUserGroup: SelectTypes[] | [];
  cancellationScheduling: SelectTypes[] | [];
  cancellationProvince: SelectTypes[] | [];
  cancellationCity: SelectTypes[] | [];
  cancellationUni: SelectTypes[] | [];
  cancellationReservationType: SelectTypes[] | [];
  cancellationRequestStatus: SelectTypes[] | [];
  cancellationDormitory: SelectTypes[] | [];
  cancellationWaitingTime: SelectTypes | undefined;
};

export type UseRequestsCancellationParamsType = {
  cancellationRequestTypeId?: string;
  cancellationGenderId?: string;
  cancellationUserGroupId?: string;
  cancellationSchedulingId?: string;
  cancellationProvinceId?: string;
  cancellationCityId?: string;
  cancellationUniId?: string;
  cancellationReservationTypeId?: string;
  cancellationWaitingTimeId?: string;
  cancellationRequestStatusId?: string;
  cancellationDormitoryId?: string;
};
