import { SingleUserInUserList } from "../../../Notification/NotificationUniversitySelector/helper/components/NotificationSingle/@types/@notificationSingle";

//! GENERAL
//! LAYOUT
export type DeleteModal = {
  isOpen: boolean;
  userName: string;
};
export type UpdateModal = {
  isOpen: boolean;
  rowData: Partial<SingleUserInUserList>;
};
export type InquiryModal = {
  isOpen: boolean;
  record: Partial<SingleUserInUserList>;
};
//! API
export type GeneralResponse<Data> = {
  status: number;
  msg: string;
  data: Data;
};
export type DeleteUserPhoneResponse = GeneralResponse<{ test: number }>;
export type UpdateUserResponse = GeneralResponse<{ test: number }>;
export type UpdateUserRequest = {
  branchCode: string | null;
  branchName: string | null;
  fieldCode: string | null;
  fieldName: string | null;
  firstName: string | null;
  gender: string | null;
  lastName: string | null;
  levelCode: string | null;
  levelName: string | null;
  nationalCode: string | null;
  studentNumber: string | null;
};
export type ChangeUserInquiryStateToFalseResponse = GeneralResponse<{ test: number }>;
export type ChangeUserInquiryStateToFalseRequest = {
  mobileNo: string;
  nationalCode: string;
};
