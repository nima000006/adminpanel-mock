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

export type RegisterActionFormDataType = {
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
export type MyDoctorTestReviewDetailListManagerType = {
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

export type GetMyDoctorTestReviewDetailListManagerResponse =
  MyDoctorTestReviewDetailListManagerType[];

export type CreateMyDoctorTestFollowUpManagerResponse = boolean;

export type CreateMyDoctorTestFollowUpManagerRequest = {
  description: string;
  followUpActionId: number;
  followerFirstName: string;
  followerLastName: string;
  surveyCycleId: number;
  nextActionType?: number;
  nextFollowUpDate?: string;
};

export type MyDoctorGetFollowUpDetailManagerResponse = {
  followUpId: number;
  followerFirstName: string;
  followerLastName: string;
  description: string;
  followUpTypeTitle: string;
  followUpActionTitle: string;
  followUpActionId: number;
  nextFollowUpDate: string | null;
  nextFollowUpTypeTitle: string | null;
  createdDate: string;
  createdUsername: string;
  createdFirstName: string;
  createdLastName: string;
  anotherFollowUp: boolean;
};
