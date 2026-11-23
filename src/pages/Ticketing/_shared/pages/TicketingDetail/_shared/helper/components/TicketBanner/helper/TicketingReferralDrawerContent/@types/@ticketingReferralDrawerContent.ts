import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type TicketingReferralDrawerContentFormValues = {
  service: SelectType<IdTitleName>[];
  topic: number;
  description: string;
};

export type TicketingReferralDrawerContentProps = {
  closeDrawerHandler: () => void;
  onFinish: (values: TicketingReferralDrawerContentFormValues) => void;
  isSubmitting?: boolean;
};
