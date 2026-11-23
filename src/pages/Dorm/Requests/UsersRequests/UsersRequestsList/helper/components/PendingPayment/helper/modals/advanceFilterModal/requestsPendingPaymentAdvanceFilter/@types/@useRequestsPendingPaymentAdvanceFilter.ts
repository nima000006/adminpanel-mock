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

export type UseRequestsPendingPaymentAdvanceFilterFormType = {
  pendingPaymentRequestType: SelectTypes[] | [];
  pendingPaymentGender: SelectTypes[] | [];
  pendingPaymentUserGroup: SelectTypes[] | [];
  pendingPaymentScheduling: SelectTypes[] | [];
  pendingPaymentProvince: SelectTypes[] | [];
  pendingPaymentCity: SelectTypes[] | [];
  pendingPaymentUni: SelectTypes[] | [];
  pendingPaymentReservationType: SelectTypes[] | [];
  pendingPaymentDormitory: SelectTypes[] | [];
  pendingPaymentWaitingTime: SelectTypes | undefined;
};

export type UseRequestsPendingPaymentParamsType = {
  pendingPaymentRequestTypeId?: string;
  pendingPaymentGenderId?: string;
  pendingPaymentUserGroupId?: string;
  pendingPaymentSchedulingId?: string;
  pendingPaymentProvinceId?: string;
  pendingPaymentCityId?: string;
  pendingPaymentUniId?: string;
  pendingPaymentReservationTypeId?: string;
  pendingPaymentDormitoryId?: string;
  pendingPaymentWaitingTimeId?: string;
};
