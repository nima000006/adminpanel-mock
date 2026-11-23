//! layout
export type CentralAccusationListTableProps = {
  accusationType: "1,2,3,4,5,7,8,9" | 1 | 2 | 3 | 4 | 5 | 7 | 8 | 9;
};
export type SendSessionAllocationFormDataType = {
  understandingMeetingId: {
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
  understandingReviewPeriod: string;
  UnderstandingProvider: string;
  understandingNotificationType: number;
  understandingNotificationMessage: string;
  needToBePresentUnderstanding: boolean | undefined;
};
