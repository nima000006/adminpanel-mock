import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type AddIssueSubjectDrawerContentProps = {
  closeDrawer: () => void;
  refetchList: () => void;
  topicId?: number;
};

export type BasicInfoCreateTopicRequest = {
  body: {
    samimService: string;
    faTitle: string;
    enTitle: string;
    arTitle: string;
    ticketPriority: string;
    faDescription?: string;
    enDescription?: string;
    arDescription?: string;
    viewStatus: string;
    active: boolean;
  };
};

export type formValuesType = {
  service?: SelectType<IdTitleName>;
  faTitle?: string;
  enTitle?: string;
  arTitle?: string;
  priority: SelectType<IdTitleName>;
  description?: string;
  viewStatus: string[];
  active?: boolean;
};

export type getTopicInfoRequest = {
  topicId: number;
};

export type getTopicInfoResponse = {
  id: number;
  faTitle: string;
  enTitle: string;
  arTitle: string;
  description: string;
  active: boolean;
  samimService: IdTitleName;
  priority: IdTitleName;
  viewStatus: IdTitleName;
  createDate: string;
  modifiedBy: string;
  modifiedByUserId: number;
  modifiedDate: string;
};

export type EditTopicInfoRequest = {
  params: {
    topicId: number;
  };
  body: {
    ticketPriority: string;
    faDescription?: string;
    enDescription?: string;
    arDescription?: string;
    viewStatus: string;
    active: boolean;
  };
};
