import { FormInstance } from "antd";
//! LAYOUT
export type InternationalInterviewReasonsItemsType = {
  label: string;
  title: string;
  value: string;
  key: number;
  item: {
    id: number;
    title: string;
  };
  code: number;
};

export type InterviewDetailConfirmModalContentProps = {
  form: FormInstance<{ reason: InternationalInterviewReasonsItemsType }>;
};
