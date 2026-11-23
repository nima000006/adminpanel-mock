import { SingleUserInUserList } from "../../../../../../pages/Notification/NotificationUniversitySelector/helper/components/NotificationSingle/@types/@notificationSingle";

export type BusinessUsersListModelProps = {
  onRemoveMobileClickHandler: (id: string) => void;
  onChangeStatusClickHandler: (id: SingleUserInUserList) => void;
  onInquiryClickHandler: (record: SingleUserInUserList) => void;
};
