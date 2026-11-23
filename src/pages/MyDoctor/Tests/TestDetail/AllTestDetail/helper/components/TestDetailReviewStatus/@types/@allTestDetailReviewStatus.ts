//! LAYOUT
type SelectType = {
  key: string;
  value: string;
  title: string;
  name: string;
  code: number;
  item: {
    id: number;
    title: string;
  };
};

export type AllRegisterActionFormDataType = {
  actionType: SelectType;
  actionResult: SelectType;
  actionsName: string;
  actionsFamily: string;
  description: string;
  necessary: number;
  reactionType: SelectType;
  date: string;
};

//! APIs
export type MyDoctorAllTestReviewDetailListType = {
  followUpId: number;
  followerFirstName: string;
  followerLastName: string;
  description: string;
  followUpActionTitle: string;
  followUpActionId: number;
  nextFollowUpDate: string;
  nextFollowUpTypeTitle: string;
  createdDate: string;
  createdUsername: string;
  createdFirstName: string;
  createdLastName: string;
  anotherFollowUp: boolean;
};

export type GetMyDoctorTestReviewDetailListResponse =
  MyDoctorAllTestReviewDetailListType[];

export type CreateMyDoctorTestFollowUpResponse = boolean;

export type CreateMyDoctorTestFollowUpRequest = {
  description: string;
  followUpActionId: number;
  followerFirstName: string;
  followerLastName: string;
  surveyCycleId: number;
  nextActionType?: number;
  nextFollowUpDate?: string;
};
