import { viewRoleListResponse } from "@pages/Ticketing/BasicInfo/BasicInfoDetail/TicketRole/helper/components/ModifyTicketRoleDrawerContent/@types/@modifyTicketRoleDrawerContentTypes";

export type ViewDrawerContentProps = {
  closeDrawer: () => void;
  loading: boolean;
  data: viewRoleListResponse | undefined;
};
