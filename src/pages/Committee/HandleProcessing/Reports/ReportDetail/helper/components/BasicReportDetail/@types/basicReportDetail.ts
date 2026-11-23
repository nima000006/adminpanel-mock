import { User } from "@pages/Committee/History/IndividualInquiry/InquiryUsersList/@types/@inquiryUsersList";

//! LAYOUT
export type BasicReportDetailProps = {
  setAccusedDataHandler: (_: Partial<User>) => void;
  isEditable: boolean;
};
