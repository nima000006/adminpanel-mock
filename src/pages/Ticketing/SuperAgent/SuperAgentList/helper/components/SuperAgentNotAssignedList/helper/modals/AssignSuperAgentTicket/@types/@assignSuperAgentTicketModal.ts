import { FormInstance } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

//! LAYOUTs

export type SuperAgentNotAssignedToMeModalConfirmContentFormType = {
  business: SelectType<IdTitle>;
  branch: SelectType<IdTitle>;
  userAssignTo: SelectType<string>;
};

export type AssignSuperAgentTicketModalProps = {
  isModalOpen: boolean;
  closeModalHandler: () => void;
  getListHandler?: (page?: string) => void;
  getBannerHandler: () => void;
  form: FormInstance<SuperAgentNotAssignedToMeModalConfirmContentFormType>;
  topicId: number;
  ticketId: string;
  pageDataLength?: number | undefined;
  from?: string;
};

//! APIs
export type GetTicketingAgentsListByTopicIdAndBranchIdResponse = {
  id: string;
  name: string;
}[];
