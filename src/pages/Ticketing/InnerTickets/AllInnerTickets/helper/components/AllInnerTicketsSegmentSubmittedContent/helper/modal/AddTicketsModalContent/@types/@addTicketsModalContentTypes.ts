type SelectType = {
  key: string;
  value: string;
  children: string;
  code: number;
  item: {
    id: number;
    title: string;
    name: string;
  };
};

export type AddInnerTicketFormType = {
  service?: SelectType;
  problemSubject: SelectType;
  faTitle: string;
  desc: string;
  business?: SelectType;
  branch?: SelectType;
  userAssignTo: SelectType;
  ticketNumber: SelectType;
};

export type InnerTicketSelectType = {
  label: string;
  title: string;
  value: string;
  key: number;
  item: {
    id: number;
    title: string;
    name?: string;
  };
  code: number;
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
