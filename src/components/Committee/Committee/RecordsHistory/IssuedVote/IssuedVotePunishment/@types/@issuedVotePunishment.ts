import { FormInstance } from "antd";

//! General
type ListDataType = {
  id: number;
  title: string;
};
export type PunishmentType = {
  count: number;
  submitForm: FormInstance<{
    [key: string]: string | React.Key | null | undefined | ListDataType[];
  }>;
  isPunishmentListLoading: boolean;
  punishmentListData?: ListDataType[];
  certaintyListData?: ListDataType[];
  executionListData?: ListDataType[];
  isCertaintyListLoading: boolean;
  isExecutionListLoading: boolean;
  reasonEscalationListData?: ListDataType[];
  isReasonEscalationListLoading: boolean;
  committeeName: string;
};
