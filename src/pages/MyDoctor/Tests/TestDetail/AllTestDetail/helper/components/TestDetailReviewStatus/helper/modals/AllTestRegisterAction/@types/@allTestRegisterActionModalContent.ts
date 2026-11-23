import { FormInstance } from "antd";

import { AllRegisterActionFormDataType } from "../../../../@types/@allTestDetailReviewStatus";

export type AllTestRegisterActionModalContentProps = {
  form: FormInstance<AllRegisterActionFormDataType>;
};

//! APIs
export type MyDoctorTestReviewDetailActionTypeListType = {
  id: number;
  title: string;
};

export type GetMyDoctorTestReviewDetailActionTypeListResponse =
  MyDoctorTestReviewDetailActionTypeListType[];

export type MyDoctorTestReviewDetailFollowUpActionTypeList = {
  id: number;
  title: string;
  followUpTypeTitle: string;
  followUpTypeId: number;
};

export type GetMyDoctorTestReviewDetailFollowUpActionTypeListResponse =
  MyDoctorTestReviewDetailFollowUpActionTypeList[];
