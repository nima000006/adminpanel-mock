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

export type UseAdmissionInactiveAdvanceFilterFormType = {
  inactiveUni: SelectTypes[] | [];
  inactiveDormitory: SelectTypes[] | [];
  inactiveScheduling: SelectTypes[] | [];
  inactiveReservationType: SelectTypes[] | [];
  inactiveManagementType: SelectTypes[] | [];
  inactivePaymentMethod: SelectTypes[] | [];
  inactiveProvince: SelectTypes[] | [];
  inactiveCity: SelectTypes[] | [];
};

export type UseAdmissionInActiveParamsType = {
  inactiveUniId?: string;
  inactiveDormitoryId?: string;
  inactiveSchedulingId?: string;
  inactiveReservationTypeId?: string;
  inactiveManagementTypeId?: string;
  inactivePaymentMethodId?: string;
  inactiveProvinceId?: string;
  inactiveCityId?: string;
};
