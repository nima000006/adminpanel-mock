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

export type UseRequestsPendingReviewAdvanceFilterFormType = {
  pendingReviewRequestType: SelectTypes[] | [];
  pendingReviewGender: SelectTypes[] | [];
  pendingReviewUserGroup: SelectTypes[] | [];
  pendingReviewScheduling: SelectTypes[] | [];
  pendingReviewProvince: SelectTypes[] | [];
  pendingReviewCity: SelectTypes[] | [];
  pendingReviewUni: SelectTypes[] | [];
  pendingReviewDormitory: SelectTypes[] | [];
  pendingReviewReservationType: SelectTypes[] | [];
  pendingReviewWaitingTime: SelectTypes | undefined;
};

export type UseRequestsPendingReviewParamsType = {
  pendingReviewRequestTypeId?: string;
  pendingReviewGenderId?: string;
  pendingReviewUserGroupId?: string;
  pendingReviewSchedulingId?: string;
  pendingReviewProvinceId?: string;
  pendingReviewCityId?: string;
  pendingReviewUniId?: string;
  pendingReviewDormitoryId?: string;
  pendingReviewReservationTypeId?: string;
  pendingReviewWaitingTimeId?: string;
};
