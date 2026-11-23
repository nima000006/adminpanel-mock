import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type AddInnerTicketFormType = {
  service?: SelectType<IdTitleName>;
  problemSubject: SelectType<IdTitleName>;
  faTitle: string;
  desc: string;
  business?: SelectType<IdTitleName>;
  branch?: SelectType<IdTitleName>;
  userAssignTo: SelectType<IdTitleName>;
  ticketNumber: SelectType<IdTitleName>;
};

export type GetAttachTicketResponse = {
  uuid: string;
  ticketTitle: string;
}[];

export type AddInnerTicketRequest = {
  body: {
    topicId: number;
    assignUserKeycloakId: string;
    relatedTicketId: string;
    title: string;
    description: string;
    branchAssignRequest: number | undefined;
  };
};

export type AddTicketsModalContentProps = {
  closeModal: () => void;
  refetchList: () => void;
  isModalOpen: boolean;
  refreshCount?: () => void;
};
