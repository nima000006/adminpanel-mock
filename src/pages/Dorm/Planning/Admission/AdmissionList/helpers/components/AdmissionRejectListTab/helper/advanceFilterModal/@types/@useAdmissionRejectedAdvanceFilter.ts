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

export type UseAdmissionRejectedAdvanceFilterFormType = {
  rejectUni: SelectTypes[] | [];
  rejectDormitory: SelectTypes[] | [];
  rejectRequestType: SelectTypes[] | [];
  rejectReservationType: SelectTypes[] | [];
  rejectProvince: SelectTypes[] | [];
  rejectCity: SelectTypes[] | [];
  rejectScheduling: SelectTypes[] | [];
};

export type UseAdmissionRejectReviewParamsType = {
  rejectUniId?: string;
  rejectDormitoryId?: string;
  rejectRequestTypeId?: string;
  rejectReservationTypeId?: string;
  rejectProvinceId?: string;
  rejectCityId?: string;
  rejectSchedulingId?: string;
};
