import { FormInstance } from "antd";

import { RegisterActionFormDataType } from "../../../../@types/@myTestDetailReviewStatus";

export type MyTestRegisterActionModalContentProps = {
  form: FormInstance<RegisterActionFormDataType>;
};

//! APIs
export type MyDoctorTestReviewDetailActionTypeListManagerType = {
  id: number;
  title: string;
};

export type GetMyDoctorTestReviewDetailActionTypeListManagerResponse =
  MyDoctorTestReviewDetailActionTypeListManagerType[];

export type MyDoctorTestReviewDetailFollowUpActionTypeListManager = {
  id: number;
  title: string;
  followUpTypeTitle: string;
  followUpTypeId: number;
};

export type GetMyDoctorTestReviewDetailFollowUpActionTypeListManagerResponse =
  MyDoctorTestReviewDetailFollowUpActionTypeListManager[];
