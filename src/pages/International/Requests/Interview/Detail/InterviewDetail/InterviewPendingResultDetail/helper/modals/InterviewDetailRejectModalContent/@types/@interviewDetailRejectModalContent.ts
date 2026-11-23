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

export type InterviewDetailRejectModalContentProps = {
  form: FormInstance<{ reason: InternationalInterviewReasonsItemsType[] }>;
};

//! API
export type InterviewReasonsType = { id: number; title: string };
export type GetInterviewReasonsWithTypeIdResponse = InterviewReasonsType[];
